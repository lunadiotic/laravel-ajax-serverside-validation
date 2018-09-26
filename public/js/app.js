$('body').on('click', '.modal-show', function (event) {
    event.preventDefault(); //Mencegah event default dari element

    var me = $(this), //membuat seleksi objek DOM yang dipilih
        url = me.attr('href'), //mendapatkan url dari nilai atribut "href"
        title = me.attr('title'); //mendapatkan title dari atribut "title"

    $('#modal-title').text(title); //mengubah judul modal dari nilai title
    $('#modal-btn-save').text(me.hasClass('edit') ? 'Update' : 'Create'); //mengubah text button save

    $.ajax({
        url: url, //memberikan nilai url ajax dari variabel url di atas
        dataType: 'html', //menentukan tipe data yang akan dimunculkan dalam ajax
        success: function (response) {
            $('#modal-body').html(response); //menampilkan respon dengan tipe data HTML ke dalam bagian id "modal-body"
        }
    });

    $('#modal').modal('show'); //menampilkan modal dari id "modal"
});