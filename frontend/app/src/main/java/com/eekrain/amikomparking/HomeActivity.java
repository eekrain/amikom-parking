package com.eekrain.amikomparking;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import com.androidnetworking.AndroidNetworking;
import com.androidnetworking.common.Priority;
import com.androidnetworking.error.ANError;
import com.androidnetworking.interfaces.JSONArrayRequestListener;
import com.androidnetworking.interfaces.JSONObjectRequestListener;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;

public class HomeActivity extends AppCompatActivity {

    SessionManager sessionManager;
    RecyclerView recycler_vehicle;

    String nim, nama;
    Context context;

    public ArrayList<String> plat = new ArrayList<String>();
    public ArrayList<String> jenis = new ArrayList<String>();


    public static String URL_GETVEHICLE  = "https://amikom.rocketjaket.com/api/vehicle/getListVehicleJSON";
    public static String TAG = "HomeActivity";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);

        sessionManager = new SessionManager(this);
        sessionManager.checkLogin();

        recycler_vehicle = findViewById(R.id.list_vehicle);

        HashMap<String, String> user = sessionManager.getUserDetail();
        nim = user.get(sessionManager.NIM);
        nama = user.get(sessionManager.NAME);

//        Toast.makeText(context, "nama : " + nama, Toast.LENGTH_SHORT).show();

        context = this;

        AndroidNetworking.initialize(getApplicationContext());
        AndroidNetworking.post(URL_GETVEHICLE)
                .addBodyParameter("nim", nim)
                .setTag(this)
                .setPriority(Priority.HIGH)
                .build()
                .getAsJSONArray(new JSONArrayRequestListener() {
                    @Override
                    public void onResponse(JSONArray response) {
                        try {
                            for(int i = 0; i<response.length(); i++){
                                JSONObject jsonObject = response.getJSONObject(i);
                                String plat_extract = jsonObject.getString("plat");
                                String jenis_extract = jsonObject.getString("jenis");
                                plat.add(plat_extract);
                                jenis.add(jenis_extract);

                                Integer xxx = plat.size();
                                Log.v(TAG, xxx.toString());


                                VehicleAdapter vehicleAdapter = new VehicleAdapter(context, plat, jenis);
                                recycler_vehicle.setAdapter(vehicleAdapter);
                                recycler_vehicle.setLayoutManager(new LinearLayoutManager(context));
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
