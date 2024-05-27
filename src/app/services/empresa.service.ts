import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  // Create a new empresa
  async createEmpresa(usuario_id: number, nit: string, titulo: string, telefono: string, direccion: string) {
    const { data, error } = await this.supabase
      .from('empresas')
      .insert([
        { usuario_id, nit, titulo, telefono, direccion }
      ]);

    if (error) {
      throw error;
    }

    return data;
  }

  // Get all empresas
  async getEmpresas() {
    const { data, error } = await this.supabase
      .from('empresas')
      .select('*');

    if (error) {
      throw error;
    }

    return data;
  }

  // Get an empresa by ID
  async getEmpresaById(id: number) {
    const { data, error } = await this.supabase
      .from('empresas')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    return data;
  }

  // Update an empresa
  async updateEmpresa(id: number, updates: any) {
    const { data, error } = await this.supabase
      .from('empresas')
      .update(updates)
      .eq('id', id);

    if (error) {
      throw error;
    }

    return data;
  }

  // Delete an empresa
  async deleteEmpresa(id: number) {
    const { data, error } = await this.supabase
      .from('empresas')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    return data;
  }
}