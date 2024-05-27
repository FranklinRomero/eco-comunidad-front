import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MetricasService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  // Create a new metrica
  async createMetrica(proyecto_id: number, costo_total: number, beneficios_netos: number, crea_empleos: boolean, acceso_servicios: boolean, emision_gases: number, consumo_recursos: number, tecno_disponible: boolean, gestion_riesgos: boolean) {
    const { data, error } = await this.supabase
      .from('metricas')
      .insert([
        { proyecto_id, costo_total, beneficios_netos, crea_empleos, acceso_servicios, emision_gases, consumo_recursos, tecno_disponible, gestion_riesgos }
      ]);

    if (error) {
      throw error;
    }

    return data;
  }

  // Get all metricas
  async getMetricas() {
    const { data, error } = await this.supabase
      .from('metricas')
      .select('*');

    if (error) {
      throw error;
    }

    return data;
  }

  // Get a metrica by ID
  async getMetricaById(id: number) {
    const { data, error } = await this.supabase
      .from('metricas')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    return data;
  }

  // Update a metrica
  async updateMetrica(id: number, updates: any) {
    const { data, error } = await this.supabase
      .from('metricas')
      .update(updates)
      .eq('id', id);

    if (error) {
      throw error;
    }

    return data;
  }

  // Delete a metrica
  async deleteMetrica(id: number) {
    const { data, error } = await this.supabase
      .from('metricas')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    return data;
  }
}