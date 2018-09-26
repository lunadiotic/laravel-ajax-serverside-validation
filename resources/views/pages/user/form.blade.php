{!! Form::model($model, [
    'route' => $model->exists ? ['user.update', $model->id] : 'user.store',
    'method' => $model->exists ? 'PUT' : 'POST' 
]) !!}
    {!! Form::hidden('id') !!}
    <div class="form-group">
        <label for="name" class="control-label">Name:</label>
        {!! Form::text('name', null, ['class' => 'form-control', 'id' => 'name']) !!}
    </div>
    <div class="form-group">
        <label for="email" class="control-label">E-Mail:</label>
        {!! Form::email('email', null, ['class' => 'form-control', 'id' => 'email']) !!}
    </div>
{!! Form::close() !!}