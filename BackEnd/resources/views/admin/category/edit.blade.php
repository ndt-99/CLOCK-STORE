@extends('admin.index')
@section('content')
  <main id="main" class="main">
    <div class="pagetitle">
        <h1>Danh Mục</h1>
        <nav>
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#">Trang chủ</a></li>
            <li class="breadcrumb-item"><a href="{{route('category.index')}}">Danh mục</a></li>
            <li class="breadcrumb-item">Sửa danh mục</a></li>
          </ol>
        </nav>
      </div>
<div class="card">
  <div class="card-body">
    <h5 class="card-title">Sửa Danh Mục</h5>
    <form  action="{{ route('category.update', $item->id) }}" method="post">
        @method('PUT')
        @csrf
      <div class="col-md-10">
        <label for="inputName5" class="form-label">Tên danh mục</label>
        <input type="text" class="form-control" id="inputName5" name='name' value="{{ old('name') ?? $item->name }} ">
        @error('name')
        <div class="text text-danger">{{ $message }}</div>
        @enderror<br>
      <div>
        <button type="submit" class="btn btn-primary">Sửa</button>
        <button type="reset" class="btn btn-secondary">Reset</button>
      </div>
    </form>
  </div>
</div>
</div>
</main>
  @endsection
