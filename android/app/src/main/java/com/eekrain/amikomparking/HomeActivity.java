package com.eekrain.amikomparking;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Context;
import android.os.Bundle;
import android.util.Log;
import android.widget.ListView;

import com.androidnetworking.AndroidNetworking;
import com.androidnetworking.common.Priority;
import com.androidnetworking.error.ANError;
import com.androidnetworking.interfaces.JSONArrayRequestListener;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;

public class HomeActivity extends AppCompatActivity {

    SessionManager sessionManager;

    RecyclerView recyclerView;

    String nim, nama;
    Context context;

    public ArrayList<String> listPlat = new ArrayList<String>(), listJenis = new ArrayList<String>(), listMerk = new ArrayList<String>(), listTipe = new ArrayList<String>();

    public static String URL_GETVEHICLE = BuildConfig.API_URL + "/user/vehicles";
    public static String TAG = "HomeActivity";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);

        sessionManager = new SessionManager(this);
        sessionManager.checkLogin();

        recyclerView = (RecyclerView) findViewById(R.id.vehicleRecycleView);

        HashMap<String, String> user = sessionManager.getUserDetail();
        nim = user.get(sessionManager.NIM);
        nama = user.get(sessionManager.NAME);

        context = this;

        AndroidNetworking.initialize(getApplicationContext());
        AndroidNetworking.enableLogging();
        AndroidNetworking.get(URL_GETVEHICLE + "?nim=" + nim)
                .setTag(this)
                .setPriority(Priority.HIGH)
                .build()
                .getAsJSONArray(new JSONArrayRequestListener() {
                    @Override
                    public void onResponse(JSONArray response) {
                        try {
                            for (int i = 0; i < response.length(); i++) {
                                JSONObject jsonObject = response.getJSONObject(i);
                                String plat = jsonObject.getString("plat");
                                String jenis = jsonObject.getString("jenis");
                                String merk = jsonObject.getString("merk");
                                String tipe = jsonObject.getString("tipe");
                                Log.i("Vehicle", plat + "|" + jenis + "|" + merk + "|" + tipe);
                                listPlat.add(plat);
                                listJenis.add(jenis);
                                listMerk.add(merk);
                                listTipe.add(tipe);
                            }

                            VehicleAdapter listVehicleAdapter = new VehicleAdapter(context, listPlat, listJenis, listMerk, listTipe);
                            recyclerView.setAdapter(listVehicleAdapter);
                            recyclerView.setLayoutManager(new LinearLayoutManager(context));
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }

                    @Override
                    public void onError(ANError anError) {
                    }
                });
    }
}
