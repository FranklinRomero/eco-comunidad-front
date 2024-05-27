import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class InversoresService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  // Create a new inversor
  async createInversor(usuario_id: number, ci: string, nombre: string, apellido: string, telefono: string) {
    const { data, error } = await this.supabase
      .from('inversores')
      .insert([
        { usuario_id, ci, nombre, apellido, telefono }
      ]);

    if (error) {
      throw error;
    }

    return data;
  }

  // Get all inversores
  async getInversores() {
    const { data, error } = await this.supabase
      .from('inversores')
      .select('*');

    if (error) {
      throw error;
    }

    return data;
  }

  // Get an inversor by ID
  async getInversorById(id: number) {
    const { data, error } = await this.supabase
      .from('inversores')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    return data;
  }

  // Update an inversor
  async updateInversor(id: number, updates: any) {
    const { data, error } = await this.supabase
      .from('inversores')
      .update(updates)
      .eq('id', id);

    if (error) {
      throw error;
    }

    return data;
  }

  // Delete an inversor
  async deleteInversor(id: number) {
    const { data, error } = await this.supabase
      .from('inversores')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    return data;
  }
}