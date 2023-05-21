package com.eekrain.amikomparking;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.androidnetworking.AndroidNetworking;
import com.androidnetworking.common.Priority;
import com.androidnetworking.error.ANError;
import com.androidnetworking.interfaces.JSONObjectRequestListener;

import org.json.JSONException;
import org.json.JSONObject;

public class LoginActivity extends AppCompatActivity {

    EditText nim, password;
    Button btn_login;
    SessionManager sessionManager;
    public static String URL_LOGIN  = BuildConfig.API_URL + "/user/auth";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        sessionManager = new SessionManager(this);

        nim = (EditText) findViewById(R.id.nim);
        password = (EditText) findViewById(R.id.password);
        btn_login = (Button) findViewById(R.id.btn_login);
        btn_login.setOnClickListener(v -> Login());

        AndroidNetworking.initialize(getApplicationContext());
        AndroidNetworking.enableLogging();
    }

    private void Login(){
        AndroidNetworking.post(URL_LOGIN)
                .addBodyParameter("nim", nim.getText().toString())
                .addBodyParameter("pass",password.getText().toString())
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
                                String nama_mhs = response.getString("nama");
                                Toast.makeText(LoginActivity.this, message, Toast.LENGTH_SHORT).show();

                                sessionManager.createSession(nim.getText().toString(), nama_mhs);

                                Intent intent = new Intent(LoginActivity.this, HomeActivity.class);
                                startActivity(intent);
                                finish();
                            }else {
                                Toast.makeText(LoginActivity.this, "Invalid NIM/Password", Toast.LENGTH_SHORT).show();
                            }
                        }catch (JSONException e){
                            e.printStackTrace();
                        }
                    }

                    @Override
                    public void onError(ANError anError) {
                        Toast.makeText(LoginActivity.this, "Jembut", Toast.LENGTH_SHORT).show();
                    }
                });
    }
}
