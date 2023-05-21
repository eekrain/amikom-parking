package com.eekrain.amikomparking;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.androidnetworking.AndroidNetworking;
import com.androidnetworking.common.Priority;
import com.androidnetworking.error.ANError;
import com.androidnetworking.interfaces.BitmapRequestListener;
import com.androidnetworking.interfaces.JSONObjectRequestListener;

import org.json.JSONException;
import org.json.JSONObject;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Locale;

public class ConfirmActivity extends AppCompatActivity {
    private ImageView foto;
    private TextView txtNama, txtNim, txtPlat, txtJenis, txtMerk, txtTipe;
    private Button confirm, back;
    Context context;
    String mhs_foto, mhs_nama, nim, plat, jenis, merk, tipe;
    public static final String URL_PROSES_PARKIR = "https://mydomain.com/api/v1/";
    SessionManager sessionManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_confirm);
        context = this;
        sessionManager = new SessionManager(this);

        foto = (ImageView)findViewById(R.id.foto_mhs);
        txtNim = (TextView)findViewById(R.id.nim_mhs);
        txtNama = (TextView)findViewById(R.id.nama_mhs);
        txtNim = (TextView)findViewById(R.id.nim_mhs);
        txtPlat = (TextView)findViewById(R.id.plat_confirm);
        txtJenis = (TextView)findViewById(R.id.jenis_confirm);
        txtMerk = (TextView)findViewById(R.id.merk_confirm);
        txtTipe = (TextView)findViewById(R.id.tipe_confirm);

        confirm = (Button)findViewById(R.id.btn_confirm);
        back = (Button)findViewById(R.id.btn_cancel);
        confirm.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                prosesParkir(1);
                Toast.makeText(context, "Berhasil! Selamat jalan ...", Toast.LENGTH_SHORT).show();

                Intent konfir_i = new Intent(context, HomeActivity.class);
                context.startActivity(konfir_i);
                finish();
            }
        });
        back.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                prosesParkir(0);
                Intent back_i = new Intent(context, HomeActivity.class);
                context.startActivity(back_i);
                finish();
            }
        });

        HashMap<String, String> user = sessionManager.getUserDetail();
        nim = user.get(sessionManager.NIM);
        mhs_nama = user.get(sessionManager.NAME);
        getIntentExtra();
        setExtra();
    }

    private void getIntentExtra() {
        if(getIntent().hasExtra("mhs_foto") && getIntent().hasExtra("plat") && getIntent().hasExtra("jenis") && getIntent().hasExtra("merk") && getIntent().hasExtra("tipe")){
            mhs_foto = getIntent().getStringExtra("mhs_foto");
            plat = getIntent().getStringExtra("plat");
            jenis = getIntent().getStringExtra("jenis");
            merk = getIntent().getStringExtra("merk");
            tipe = getIntent().getStringExtra("tipe");
        } else {
            Toast.makeText(context, "No Data", Toast.LENGTH_SHORT).show();
        }
    }

    private void setExtra() {
        AndroidNetworking.get(mhs_foto)
                .setTag("imageRequestTag")
                .setPriority(Priority.MEDIUM)
                .setBitmapMaxHeight(100)
                .setBitmapMaxWidth(100)
                .setBitmapConfig(Bitmap.Config.ARGB_8888)
                .build()
                .getAsBitmap(new BitmapRequestListener() {
                    @Override
                    public void onResponse(Bitmap bitmap) {
                        foto.setImageBitmap(bitmap);
                        txtNama.setText(mhs_nama);
                        txtNim.setText(nim);
                        txtPlat.setText(plat);
                        txtJenis.setText(jenis);
                        txtMerk.setText(merk);
                        txtTipe.setText(tipe);
                    }
                    @Override
                    public void onError(ANError error) {
                        // handle error
                        Toast.makeText(context, "Error", Toast.LENGTH_SHORT).show();
                    }
                });
    }

    public void prosesParkir(final Integer is_confirm) {
        SimpleDateFormat time = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss", Locale.getDefault());
        final String now = time.format(new Date());

        AndroidNetworking.post(URL_PROSES_PARKIR)
                .addBodyParameter("nim", nim)
                .addBodyParameter("plat",plat)
                .addBodyParameter("status", is_confirm.toString())
                .addBodyParameter("date", now)
                .setTag(this)
                .setPriority(Priority.HIGH)
                .build()
                .getAsJSONObject(new JSONObjectRequestListener() {
                    @Override
                    public void onResponse(JSONObject response) {
                        try {
                            Boolean status = response.getBoolean("status");
                            String message = response.getString("message");

                            if (status){
                                Toast.makeText(context, "is_confirm : " + is_confirm.toString() + ", status : " + message, Toast.LENGTH_SHORT).show();
                                if(is_confirm == 0){
                                    Toast.makeText(context, "Pastikan data-data kendaraan anda sesuai", Toast.LENGTH_SHORT).show();
                                } else{
                                    Toast.makeText(context, message, Toast.LENGTH_SHORT).show();
                                }
                            }else {
                                Toast.makeText(context, "is_confirm : " + is_confirm.toString() + ", status : " + message, Toast.LENGTH_SHORT).show();
                                if(is_confirm == 0){
                                    Toast.makeText(context, "Pastikan data-data kendaraan anda sesuai", Toast.LENGTH_SHORT).show();
                                } else{
                                    Toast.makeText(context, message, Toast.LENGTH_SHORT).show();
                                }
                            }
                        }catch (JSONException e){
                            e.printStackTrace();
                        }
                    }

                    @Override
                    public void onError(ANError anError) {

                    }
                });
    }
}
