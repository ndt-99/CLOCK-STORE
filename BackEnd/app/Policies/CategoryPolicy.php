<?php

namespace App\Policies;

use App\Models\Category;
use Illuminate\Auth\Access\HandlesAuthorization;

class CategoryPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\Models\Category  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function viewAny(Category $category)
    {
        return $category->hasPermission('Category_viewAny');
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\Category  $user
     * @param  \App\Models\Category  $model
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(Category $category, Category $model)
    {
        return $category->hasPermission('Category_view');
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\Category  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(Category $category)
    {
         return $category->hasPermission('Category_create');
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\Category  $user
     * @param  \App\Models\Category  $model
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(Category $category, Category $model)
    {
        return $category->hasPermission('Category_update');
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\Category  $user
     * @param  \App\Models\Category  $model
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(Category $category, Category $model)
    {
        return $category->hasPermission('Category_delete');
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\Category  $user
     * @param  \App\Models\Category  $model
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restore(Category $category, Category $model)
    {
        return $category->hasPermission('Category_restore');
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\Category  $user
     * @param  \App\Models\Category  $model
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(Category $category, Category $model)
    {
        return $category->hasPermission('Category_forceDelete');
    }
}
