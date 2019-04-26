$(document).ready(function(){
    var nguoiDungService = new NguoiDungService();

    layDanhNguoiDung();

    function getInput(title, btnTitle, btnID){
        $(".modal-title").html(title);
        var footer = `
            <button id="${btnID}" class="btn btn-success">${btnTitle}</button>
            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
        `
        $(".modal-footer").html(footer);
    }

    $("#btnThemNguoiDung").click(function(){
        getInput("Thêm người dùng", "Thêm", "btnThem");
    })

    $("body").delegate(".btnSua", "click", function(){
        var taiKhoan = $(this).data('taikhoan');

        // var viTri = nguoiDungService.layViTriNguoiDung(taiKhoan);
        var nguoiDung = nguoiDungService.layThongTinNguoiDung(taiKhoan);
        console.log(nguoiDung);
        $("#TaiKhoan").val(taiKhoan);
        $("#HoTen").val(nguoiDung.HoTen);
        $("#MatKhau").val(nguoiDung.MatKhau);
        $("#Email").val(nguoiDung.Email);
        $("#SoDienThoai").val(nguoiDung.SoDT);
        $("#loaiNguoiDung").val(nguoiDung.TenLoaiNguoiDung);
    })

    $("body").delegate("#btnThem", "click", function(){
        var taiKhoan = $("#TaiKhoan").val();
        var hoTen = $("#HoTen").val();
        var matKhau = $("#MatKhau").val();
        var email = $("#Email").val();
        var soDT = $("#SoDienThoai").val();
        var loaiNguoiDung = $("#loaiNguoiDung").val();

        var nguoiDung = new NguoiDung(taiKhoan, matKhau, hoTen, email, soDT, loaiNguoiDung);
        console.log(nguoiDung);
        nguoiDungService.themNguoiDung(nguoiDung);
    })

    $("body").delegate(".btnXoa", "click", function(){
        var taiKhoan = $(this).data('taikhoan');
        nguoiDungService.xoaNguoiDung(taiKhoan);
    })

    $("#txtTimKiem").keyup(function(){
        var mangTimKiem = []
        var taiKhoan = $("#txtTimKiem").val();
        mangTimKiem = nguoiDungService.timKiemNguoiDung(taiKhoan);
        taoBang(mangTimKiem);
    })

    function layDanhNguoiDung(){
        nguoiDungService.layDanhLayNguoiDung()
        .done(function(resutl){
            taoBang(resutl);
            localStorage.setItem("danhSachNguoiDung", JSON.stringify(resutl));
        })
        .fail(function(err){
            console.log(err);
        })
    }

    function taoBang(danhSachNguoiDung){
        var tblBody = "";
        danhSachNguoiDung.map(function(item, index){
            tblBody += `
                 <tr>
                    <td>${index + 1}</td>
                     <td>${item.TaiKhoan}</td>
                     <td>${item.MatKhau}</td>
                     <td>${item.HoTen}</td>
                     <td>${item.Email}</td>
                     <td>${item.SoDT}</td>
                     <td>${item.TenLoaiNguoiDung}</td>
                     <td>
                        <button class="btn btn-success btnSua" data-toggle="modal" data-target="#myModal">Sửa</button>
                        <button class="btn btn-danger btnXoa" data-taikhoan="${item.TaiKhoan}">Xóa</button>
                     </td>
                 </tr>
             `
        })
        $("#tblDanhSachNguoiDung").html(tblBody);
    }
})