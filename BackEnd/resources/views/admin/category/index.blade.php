@extends('admin.index')
@section('content')
<main id="main" class="main">
    <div class="pagetitle">
        <h1 class="mb-1">Danh Mục</h1>
        <nav>
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#">Trang chủ</a></li>
            <li class="breadcrumb-item">Danh mục</a></li>
          </ol>
        </nav>
      </div>
<div class="card">
  <div class="card-body">
    <h5 class="card-title">Danh Sách Danh Mục</h5>
    @if (Session::has('success'))
    <p class="text-success"><i class="fa fa-check" aria-hidden="true"></i>
        {{ Session::get('success') }}
    </p>
@endif
@if (Session::has('error'))
    <p class="text-danger"><i class="bi bi-x-circle"></i>
        {{ Session::get('error') }}
    </p>
@endif
    <a class='btn btn-primary mb-2'  href="{{route('category.create')}}">Thêm danh mục</a>
    <a class='btn btn-secondary mb-2 float-right'  href="{{route('category.getTrashed')}}">Thùng rác</a>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Tên danh mục</th>
          <th scope="col">Số lượng sản phẩm</th>
          <th scope="col">Thao tác</th>
        </tr>
      </thead>
      <tbody>
        @if (isset($categories))
          @foreach ($categories as $key => $category)
        <tr>
          <th scope="row">{{$key + 1}}</th>
          <td>{{$category->name}}</td>
          <td>{{$category->products->count()}}</td>
          <td>
            <form action="{{ route('category.destroy', $category->id) }}" method="post" >
                @method('DELETE')
                @csrf
            <a style='color:rgb(52,136,245)' class='btn' href="{{route('category.edit',$category->id)}}">
                <i class='bi bi-pencil-square h4'></i></a>
            <button onclick="return confirm('Bạn có chắc muốn đưa danh mục này vào thùng rác không?');" class ='btn' style='color:rgb(52,136,245)' type="submit" ><i class='bi bi-trash h4'></i></button>
            </form>
          </td>
        </tr>
        @endforeach
        @endif
      </tbody>
    </table>
    {{ $categories->onEachSide(5)->links() }}
  </div>
</div>
</main>
@endsection
