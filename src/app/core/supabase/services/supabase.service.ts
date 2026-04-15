import { Injectable } from '@angular/core';
import { supabaseClient } from './supabase.client';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  client = supabaseClient;
}
