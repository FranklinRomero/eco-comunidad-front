import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class InversionesService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  // Create a new inversion
  async createInversion(inversor_id: number, proyecto_id: number, monto: number) {
    const { data, error } = await this.supabase
      .from('inversiones')
      .insert([
        { inversor_id, proyecto_id, monto }
      ]);

    if (error) {
      throw error;
    }

    return data;
  }

  // Get all inversiones
  async getInversiones() {
    const { data, error } = await this.supabase
      .from('inversiones')
      .select('*');

    if (error) {
      throw error;
    }

    return data;
  }

  // Get an inversion by ID
  async getInversionById(id: number) {
    const { data, error } = await this.supabase
      .from('inversiones')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    return data;
  }

  // Update an inversion
  async updateInversion(id: number, updates: any) {
    const { data, error } = await this.supabase
      .from('inversiones')
      .update(updates)
      .eq('id', id);

    if (error) {
      throw error;
    }

    return data;
  }

  // Delete an inversion
  async deleteInversion(id: number) {
    const { data, error } = await this.supabase
      .from('inversiones')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    return data;
  }
}