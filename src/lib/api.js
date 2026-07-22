import { supabase } from './supabase'

export async function getMenuItems() {
  const { data, error } = await supabase
    .from('menu_items')
    .select(`*, menu_categories(name)`)
    .order('name')
  if (error) throw new Error(error.message)
  return data
}

export async function getMenuCategories() {
  const { data, error } = await supabase
    .from('menu_categories')
    .select('*')
    .order('display_order')
  if (error) throw new Error(error.message)
  return data
}

export async function createMenuItem(item) {
  const { data, error } = await supabase
    .from('menu_items')
    .insert(item)
    .select(`*, menu_categories(name)`)
    .single()
  if (error) throw new Error(error.message)
  return data
}

export async function updateMenuItem({ id, ...item }) {
  const { data, error } = await supabase
    .from('menu_items')
    .update(item)
    .eq('id', id)
    .select(`*, menu_categories(name)`)
    .single()
  if (error) throw new Error(error.message)
  return data
}

export async function deleteMenuItem(id) {
  const { error } = await supabase
    .from('menu_items')
    .delete()
    .eq('id', id)
  if (error) throw new Error(error.message)
}

export async function createMenuCategory(data) {
  const { data: result, error } = await supabase
    .from('menu_categories')
    .insert(data)
    .select('*')
    .single()
  if (error) throw new Error(error.message)
  return result
}

export async function updateMenuCategory({ id, ...data }) {
  const { data: result, error } = await supabase
    .from('menu_categories')
    .update(data)
    .eq('id', id)
    .select('*')
    .single()
  if (error) throw new Error(error.message)
  return result
}

export async function deleteMenuCategory(id) {
  const { error } = await supabase
    .from('menu_categories')
    .delete()
    .eq('id', id)
  if (error) throw new Error(error.message)
}
