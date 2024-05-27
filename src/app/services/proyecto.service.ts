import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  // Create a new proyecto
  async createProyecto(empresa_id: number, titulo: string, tipo: string, progreso: number, es_viable: boolean) {
    const { data, error } = await this.supabase
      .from('proyectos')
      .insert([
        { empresa_id, titulo, tipo, progreso, es_viable }
      ]);

    if (error) {
      throw error;
    }

    return data;
  }

  // Get all proyectos
  async getProyectos() {
    const { data, error } = await this.supabase
      .from('proyectos')
      .select('*');

    if (error) {
      throw error;
    }

    return data;
  }

  // Get a proyecto by ID
  async getProyectoById(id: number) {
    const { data, error } = await this.supabase
      .from('proyectos')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    return data;
  }

  // Update a proyecto
  async updateProyecto(id: number, updates: any) {
    const { data, error } = await this.supabase
      .from('proyectos')
      .update(updates)
      .eq('id', id);

    if (error) {
      throw error;
    }

    return data;
  }

  // Delete a proyecto
  async deleteProyecto(id: number) {
    const { data, error } = await this.supabase
      .from('proyectos')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    return data;
  }
}