$('body').on('click', '.modal-show', function (event) {
    event.preventDefault(); //Mencegah event default dari element

    var me = $(this), //membuat seleksi objek DOM yang dipilih
        url = me.attr('href'), //mendapatkan url dari nilai atribut "href"
        title = me.attr('title'); //mendapatkan title dari atribut "title"

    $('#modal-title').text(title); //mengubah judul modal dari nilai title
    $('#modal-btn-save').removeClass('hide') //menghapus class hide jika ada karena show
    .text(me.hasClass('edit') ? 'Update' : 'Create'); //mengubah text button save

    $.ajax({
        url: url, //memberikan nilai url ajax dari variabel url di atas
        dataType: 'html', //menentukan tipe data yang akan dimunculkan dalam ajax
        success: function (response) {
            $('#modal-body').html(response); //menampilkan respon dengan tipe data HTML ke dalam bagian id "modal-body"
        }
    });

    $('#modal').modal('show'); //menampilkan modal dari id "modal"
});


$('#modal-btn-save').click(function (event) {
    event.preventDefault();

    var form    = $('#modal-body form'), //seleksi element form yang ada di dalam id #modal-body
        url     = form.attr('action'), //mengambil url yang ada pada atribut action di dalam form yang dipilih
        method  = $('input[name=_method]').val() == undefined ? 'POST' : 'PUT'; //menentukan HTTP method dengan memeriksa apakah terdapat nilai pada atribut _method atau tidak

    form.find('.help-block').remove(); //menghapus element HTML yang memiliki class "help-block"
    form.find('.form-group').removeClass('has-error'); //menghapus class "has-error" yang bersamaan dengan class "form-group"

    $.ajax({
        url     : url,
        method  : method,
        data    : form.serialize(), //mengambil seluruh data dari form dengan format url-encode
        success : function (response) {
            form.trigger('reset'); //Hapus inputan pada form
            $('#modal').modal('hide'); //Hide modal
            $('#datatable').DataTable().ajax.reload(); //melakukan reload pada datatables dengan id "datatable"
            swal({
                type    : 'success',
                title   : 'Success!',
                text    : 'Data has been saved!',
            }); //show flash message
        },
        error   : function (xhr) {
            var errors = xhr.responseJSON; //simpan response xhr di variabel errors
            if ($.isEmptyObject(errors) == false) { //Jika objek errors ini bukan kosong maka lakukan perulangan
                $.each(errors, function(key, value) { //lakukan perulangan dari setiap error, dan kita letakkan pada element form tertentu
                    $('#' + key) //pilih element form dengan ID yang sudah dibuat, SARAN: SAMAKAN DENGAN NAMA TABEL SERVER AGAR MUDAH UNTUK MENAMPILKAN VALIDASI PER KOLOM
                        .closest('.form-group') //cari class terdekat yang memiliki class "form-group"
                        .addClass('has-error') //tambahkan class "has-error" pada class tersebut yang sama dengan form-group
                        .append('<span class="help-block"><strong>' + value + '</strong></span>') //menambahkan element span yang berisikan pesan error yang dihasilkan dari server side
                });
            }
        }
    });
});

$('body').on('click', '.btn-delete', function (event) {
    event.preventDefault();

    var me = $(this),
        url = me.attr('href'),
        title = me.attr('title'),
        csrf_token = $('meta[name="csrf-token"]').attr('content');

        swal({
            title: 'Are you sure want to delete ' +  title + ' ?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                 $.ajax({
                     url: url,
                     type: "POST",
                     data: {
                         '_method': 'DELETE',
                         '_token': csrf_token
                     },
                     success: function (response) {
                        $('#datatable').DataTable().ajax.reload();
                        swal({
                            type: 'success',
                            title: 'Success!',
                            text: 'Data has been deleted!',
                        });
                     },
                     error: function (xhr) {
                        swal({
                            type: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!',
                        });
                     }
                });
            }
        });
});

$('body').on('click', '.btn-show', function (event) {
    event.preventDefault(); //Mencegah event default dari element

    var me = $(this), 
        url = me.attr('href'), 
        title = me.attr('title');

    $('#modal-title').text(title); //mengubah judul modal dari nilai title
    $('#modal-btn-save').addClass('hide'); //menyembunyikan tombol save

    $.ajax({
        url: url, //memberikan nilai url ajax dari variabel url di atas
        dataType: 'html', //menentukan tipe data yang akan dimunculkan dalam ajax
        success: function (response) {
            $('#modal-body').html(response); //menampilkan respon dengan tipe data HTML ke dalam bagian id "modal-body"
        }
    });

    $('#modal').modal('show'); //menampilkan modal dari id "modal"
});