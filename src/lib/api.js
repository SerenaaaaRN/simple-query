import { supabase } from './supabase'

export const getMenuItems = async () => {
  const { data, error } = await supabase
    .from('menu_items')
    .select(`*, menu_categories(name)`)
    .order('name')
  if (error) throw new Error(error.message)
  return data
}

export const createMenuItem = async (item) => {
  const { data, error } = await supabase
    .from('menu_items')
    .insert(item)
    .select(`*, menu_categories(name)`)
    .single()
  if (error) throw new Error(error.message)
  return data
}

export const updateMenuItem = async ({ id, ...item }) => {
  const { data, error } = await supabase
    .from('menu_items')
    .update(item)
    .eq('id', id)
    .select(`*, menu_categories(name)`)
    .single()
  if (error) throw new Error(error.message)
  return data
}

export const deleteMenuItem = async (id) => {
  const { error } = await supabase
    .from('menu_items')
    .delete()
    .eq('id', id)
  if (error) throw new Error(error.message)
}

export const getMenuCategories = async () => {
  const { data, error } = await supabase
    .from("menu_categories")
    .select("*")
    .order("display_order");
  if (error) throw new Error(error.message);
  return data;
}

export const createMenuCategory = async (data) => {
  const { data: result, error } = await supabase
    .from('menu_categories')
    .insert(data)
    .select('*')
    .single()
  if (error) throw new Error(error.message)
  return result
}

export const updateMenuCategory = async ({ id, ...data }) => {
  const { data: result, error } = await supabase
    .from('menu_categories')
    .update(data)
    .eq('id', id)
    .select('*')
    .single()
  if (error) throw new Error(error.message)
  return result
}

export const deleteMenuCategory = async (id) => {
  const { error } = await supabase
    .from('menu_categories')
    .delete()
    .eq('id', id)
  if (error) throw new Error(error.message)
}
