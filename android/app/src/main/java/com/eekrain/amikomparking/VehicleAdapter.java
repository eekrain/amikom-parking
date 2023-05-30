package com.eekrain.amikomparking;

import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;

public class VehicleAdapter extends RecyclerView.Adapter<VehicleAdapter.MyViewHolder> {

    ArrayList<String> listPlat, listJenis, listMerk, listTipe;
    Context context;

    public VehicleAdapter(Context ct, ArrayList<String> listPlat, ArrayList<String> listJenis, ArrayList<String> listMerk, ArrayList<String> listTipe) {
        context = ct;
        this.listPlat = listPlat;
        this.listJenis = listJenis;
        this.listMerk = listMerk;
        this.listTipe = listTipe;
    }

    @NonNull
    @Override
    public MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(context);
        View view = inflater.inflate(R.layout.activity_vehicle_row_view, parent, false);
        return new MyViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull MyViewHolder holder, int position) {
        String plat = listPlat.get(holder.getAdapterPosition());
        String jenis = listJenis.get(holder.getAdapterPosition());
        String merk = listMerk.get(holder.getAdapterPosition());
        String tipe = listTipe.get(holder.getAdapterPosition());
        Log.i("plat", plat);
        Log.i("jenis", jenis);
        Log.i("merk",merk);
        Log.i("tipe", tipe);

        holder.vehicleRowPlat.setText(plat);
        holder.vehicleRowMerk.setText(merk);
        holder.vehicleRowTipe.setText(tipe);

        if (jenis.equals("MOBIL"))
            holder.vehicleRowPhoto.setImageResource(R.drawable.ic_car);

        holder.rowLayout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(context, QRScanActitivy.class);
                intent.putExtra("plat", listPlat.get(holder.getAdapterPosition()));
                context.startActivity(intent);
            }
        });
    }

    @Override
    public int getItemCount() {
        return listPlat.size();
    }

    public class MyViewHolder extends RecyclerView.ViewHolder {

        TextView vehicleRowPlat, vehicleRowMerk, vehicleRowTipe;
        ImageView vehicleRowPhoto;
        LinearLayout rowLayout;

        public MyViewHolder(@NonNull View itemView) {
            super(itemView);

            vehicleRowPlat = itemView.findViewById(R.id.vehicleRowPlat);
            vehicleRowMerk = itemView.findViewById(R.id.vehicleRowMerk);
            vehicleRowTipe = itemView.findViewById(R.id.vehicleRowTipe);
            vehicleRowPhoto = itemView.findViewById(R.id.vehicleRowPhoto);
            rowLayout = itemView.findViewById(R.id.vehicleRowLayout);
        }
    }
}
