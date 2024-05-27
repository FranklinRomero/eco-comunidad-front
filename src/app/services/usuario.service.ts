import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  // Create a new user
  async createUser(email: string, password: string, tipo: string) {
    const { data, error } = await this.supabase
      .from('usuarios')
      .insert([
        { email, password, tipo }
      ]);

    if (error) {
      throw error;
    }

    return data;
  }

  // Get all users
  async getUsers() {
    const { data, error } = await this.supabase
      .from('usuarios')
      .select('*');

    if (error) {
      throw error;
    }

    return data;
  }

  // Get a user by ID
  async getUserById(id: number) {
    const { data, error } = await this.supabase
      .from('usuarios')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    return data;
  }

  // Update a user
  async updateUser(id: number, updates: any) {
    const { data, error } = await this.supabase
      .from('usuarios')
      .update(updates)
      .eq('id', id);

    if (error) {
      throw error;
    }

    return data;
  }

  // Delete a user
  async deleteUser(id: number) {
    const { data, error } = await this.supabase
      .from('usuarios')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    return data;
  }

  async login(email: string, password: string) {
    const user: any = await this.supabase.from('usuarios')
      .select('email')
      .eq('email', email)
      .single();
    
    const pass: any = await this.supabase.from('usuarios')
      .select('password')
      .eq('email', email)
      .single();

      console.log(pass.data.password);

    return pass.data.password === password;
  }
}