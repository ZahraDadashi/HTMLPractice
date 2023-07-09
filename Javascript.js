


var table = document.querySelector("#table");
//var LoadMoreButton = document.querySelector("#load-more-button");
//const tableHead = table.querySelector("thead");
const tableBody = table.querySelector("tbody");

//var initialItems = 10;
//var loadItems = 10;
fetch("http://parsianlotusfund.ir/data/nav")
    .then(response => response.json())
    .then(data => {
        localStorage.setItem("data", JSON.stringify(data.data));
    });

//new way to get data
$(document).ready(function () {

    //var json = JSON.stringify("http://parsianlotusfund.ir/data/nav");
    var json = JSON.parse(localStorage.getItem("data"));
    var table = $("#table");
    table.DataTable({
        "data": json,
        "columns": [
            { "data": 'JalaliDate' },
            { "data": 'PurchaseNAVPerShare' },
            { "data": 'SellNAVPerShare' },
            { "data": 'NAV' },
            {
                "data": null,
                "name": "Edit",
                "render": function (data, type, row) {
                    return '<button class="btn btn-success btn-edit" id="btn-edit">Edit</button>';
                }
            },
            {
                "data": null,
                "name": "Delete",
                "render": function (data, type, row) {
                    return '<button class="btn btn-danger btn-delete" id="btn-delete">Delete</button>';
                }
            }

        ],
        "columnDefs":
            [
                {
                    targets: 1,
                    render: $.fn.dataTable.render.number(',', '.', 0, '')
                },
                {
                    targets: 2,
                    render: $.fn.dataTable.render.number(',', '.', 0, '')
                },
                {
                    targets: 3,
                    render: $.fn.dataTable.render.number(',', '.', 0, '')
                }
            ],

    });
 
});
//$('.trigger').on(| 'click', function () {
//    table.row
//    .add()
//});

//table.add.row({
//    "JalaliDate": '1300/02/02',
//    "PurchaseNAVPerShare": '100000',
//    "SellNAVPerShare": '22222',
//    "NAV": '3223232'
//}).draw();


//********************
//function loadIntoTable() {

//    var out = "";
//    var counter = 0;
//    const data = JSON.parse(localStorage.getItem("data"));

//    for (const row of data) {
//        //if (counter < initialItems) {
//            out += `
//        <tr id="data-row">
//        <td class=data id="JalDate">${row.JalaliDate}</td>
//        <td class=data id="Pnav">${row.PurchaseNAVPerShare.toLocaleString("en-US")}</td>
//        <td class=data id="Snav">${row.SellNAVPerShare.toLocaleString("en-US")}</td>
//        <td class=data id="nav">${row.NAV.toLocaleString("en-US")}</td>
//        <td class=data><button class="btn btn-success btn-edit" id="btn-edit">Edit</button></td>
//        <td class=data><button class="btn btn-danger btn-delete" id="btn-delete">Delete</button></td>
//        </tr>
//`;
//        //}
//        //counter++;
//    }
//    tableBody.innerHTML = out;
//}
//********************

//function loadMoreButton() {
//    const data = JSON.parse(localStorage.getItem("data"));
//    const currentDisplayedItems = document.querySelectorAll(".data").length;
//    var out = "";
//    var counter = 0;
//    for (const row of data) {
//        if (counter >= currentDisplayedItems && counter < loadItems + currentDisplayedItems) {
//            out += `
//        <tr>
//        <td class=data>${row.JalaliDate}</td>
//        <td class=data>${row.PurchaseNAVPerShare.toLocaleString("en-US")}</td>
//        <td class=data>${row.SellNAVPerShare.toLocaleString("en-US")}</td>
//        <td class=data>${row.NAV.toLocaleString("en-US")}</td>
//        </tr>
//`;

//        }
//        counter++;

//    }
//    tableBody.innerHTML += out;
//    if (document.querySelectorAll(".data").length == data.length) {
//        LoadMoreButton.style.display = "none";
//    }
//}

//loadIntoTable();
//********************

var swiper = new Swiper(".mySwiper", {
    cssMode: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
    },
    mousewheel: true,
    keyboard: true,
});

//initial chart
$(function () {
    var chart;
    var initialItems = 10;
    var counter = 0;
    var NAV = [];
    var SellNav = [];
    var PNav = [];
    var xDate = [];
    const data = JSON.parse(localStorage.getItem("data"));
    for (const row of data) {
        if (counter < initialItems) {
            const date = row.JalaliDate;
            const nav = row.NAV;
            const Sellnav = row.SellNAVPerShare;
            const Pnav = row.PurchaseNAVPerShare;
            xDate.push(date);
            NAV.push(nav);
            SellNav.push(Sellnav);
            PNav.push(Pnav);
        }
        counter++;
    }

    $(document).ready(function () {
        // $.getJSON("data.php", function(json) {

        chart = new Highcharts.Chart({
            chart: {
                renderTo: 'chart',
                type: 'line',
                marginRight: 130,
                marginBottom: 25,
                zoomType: 'x'
            },
            title: {
                text: 'Parsian Lotus Fund Data',
                x: -20 //center
            },
            subtitle: {
                text: '',
                x: -20
            },
            xAxis: {
                categories: xDate,
                crosshair: true,
            },
            yAxis: [{
                lables: {
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                title: {
                    text: 'NAV',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                }
            },
            {
                gridLineWidth: 0,

                labels: {
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },

                title: {
                    text: 'SellNav-PurchaseNAV',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                opposite: true
            }
            ],
            tooltip: {
                //formatter: function () {
                //    return '<b>' + this.series.name + '</b><br/>' +
                //        this.x + ': ' + this.y;
                //},
                headerFormat: '<span style="font-size:10px">{point.key}</span><table class="table table-striped">',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:f}</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: 80,
                y: 60,
                borderWidth: 20,
                floating: true
            },
            series: [{
                name: 'NAV',
                type: 'spline',
                yAxis: 0,
                data: NAV

            },
            {
                name: 'SellNav',
                type: 'spline',
                yAxis: 1,
                data: SellNav
            },
            {
                name: 'PNav',
                type: 'column',
                yAxis: 1,
                data: PNav
            }
            ]

        });

        //  });

    });

});

//load chart with more button
var btnclick = 10;
function loadChart() {
    btnclick += 10;
    $(function () {
        var chart;
        var initialItems = 10 + btnclick;
        var counter = 0;
        var NAV = [];
        var SellNav = [];
        var PNav = [];
        var xDate = [];
        const data = JSON.parse(localStorage.getItem("data"));
        for (const row of data) {
            if (counter < initialItems) {
                const date = row.JalaliDate;
                const nav = row.NAV;
                const Sellnav = row.SellNAVPerShare;
                const Pnav = row.PurchaseNAVPerShare;
                xDate.push(date);
                NAV.push(nav);
                SellNav.push(Sellnav);
                PNav.push(Pnav);
            }
            counter++;
        }

        $(document).ready(function () {
            // $.getJSON("data.php", function(json) {

            chart = new Highcharts.Chart({
                chart: {
                    renderTo: 'chart',
                    type: 'line',
                    marginRight: 130,
                    marginBottom: 80,
                    zoomType: 'x'
                },
                title: {
                    text: 'Parsian Lotus Fund Data',
                    x: -20 //center
                },
                subtitle: {
                    text: '',
                    x: -20
                },
                xAxis: {
                    categories: xDate,
                    crosshair: true,
                },
                yAxis: [{
                    lables: {
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    },
                    title: {
                        text: 'NAV',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    }
                },
                {
                    gridLineWidth: 0,

                    labels: {
                        style: {
                            color: Highcharts.getOptions().colors[0]
                        }
                    },

                    title: {
                        text: 'SellNav-PurchaseNAV',
                        style: {
                            color: Highcharts.getOptions().colors[0]
                        }
                    },
                    opposite: true
                }
                ],
                tooltip: {

                    headerFormat: '<span style="font-size:10px">{point.key}</span><table class="table table-striped">',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y:f}</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true

                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    x: -10,
                    y: 100,
                    borderWidth: 0
                },
                series: [{
                    name: 'NAV',
                    type: 'spline',
                    yAxis: 0,
                    data: NAV

                },
                {
                    name: 'SellNav',
                    type: 'spline',
                    yAxis: 1,
                    data: SellNav
                },
                {
                    name: 'PNav',
                    type: 'column',
                    yAxis: 1,
                    data: PNav
                }
                ]

            });

            //  });

        });

    });
}


//Edit row
$(function () {

    var _tr = null;
    $(document).on('click', '.btn-edit', function () {
        _tr = $(this).closest('tr');
        var _JalaliDate = $(_tr).find('td:eq(0)').text();
        var _PurchaseNAVPerShare = $(_tr).find('td:eq(1)').text();
        var _SellNAVPerShare = $(_tr).find('td:eq(2)').text();
        var _NAV = $(_tr).find('td:eq(3)').text();


        $('input[id = "jdateEdit"]').val(_JalaliDate);
        $('input[id = "pnavEdit"]').val(_PurchaseNAVPerShare);
        $('input[id = "snavEdit"]').val(_SellNAVPerShare);
        $('input[id = "navEdit"]').val(_NAV);

        $('#editModal').modal();
    });
  
    $(document).on('click', '#btn-update', function () {

        if (_tr) {            
            var _JalaliDate = $('input[id = "jdateEdit"]').val();
            var _PurchaseNAVPerShare = $('input[id = "pnavEdit"]').val();
            var _SellNAVPerShare = $('input[id = "snavEdit"]').val();
            var _NAV = $('input[id = "navEdit"]').val();

            $(_tr).find('td:eq(0)').text(_JalaliDate);
            $(_tr).find('td:eq(1)').text(_PurchaseNAVPerShare);
            $(_tr).find('td:eq(2)').text(_SellNAVPerShare);
            $(_tr).find('td:eq(3)').text(_NAV);
            _tr = null;
        }
    });
});


//delete row
$(document).on('click', '.btn-delete', function () {
    console.log("helloooooo delete");
    $(this).closest('tr').remove();
});


//add new modal
const modal = document.querySelector(".modal2");
const trigger = document.querySelector(".trigger");
const closeButton = document.querySelector(".close-button");

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);


$(document).ready(function () {
    $("#SDate").persianDatepicker({ formatDate: "YYYY/0M/0D"});
    $("#EDate").persianDatepicker({ formatDate: "YYYY/0M/0D"});
    $("#jdate").persianDatepicker({ formatDate: "YYYY/0M/0D"});
    $("#jdateEdit").persianDatepicker({ formatDate: "YYYY/0M/0D"});
});

//var table = $('#table').DataTable();


//$('#table').dataTable({
//    searching: true,
//    "paging": false, info: false
//});


$(document).on('click','#btn-filter',function () {
$.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {
    var min = document.getElementById("SDate").value;
    var max = document.getElementById("EDate").value;
    var date = data[0];
  
    if (
                (min === null && max === null) ||
                (min === null && date <= max) ||
                (min <= date && max === null) ||
                (min <= date && date <= max)
            ) {
                return true;
            }
    return false;
});
var table = document.getElementById("#table");
$('#table').ready(function () {

    if (table) {
        table.clear();
        table.destroy();
        $('#SDate, #EDate').on('change', function () {
            table.draw();
        });
    }
});
});






//ok bud- no paging
//function filterTable() {
//    var  min,max, table, tr, td, i, date;
//    var minDate = document.getElementById("SDate")
//    var maxDate = document.getElementById("EDate")  
//    min = minDate.value;
//    max = maxDate.value;
//    table = document.getElementById("table");
//    tr = table.getElementsByTagName("tr");
//    for (i = 0; i < tr.length-1; i++) {
//        td = tr[i].getElementsByTagName("td")[0];
        
//        if (td) {

//            date = td.textContent || td.innerText;
//          //if (txtValue.toUpperCase().indexOf(min) > -1) {
//            if (min <= date && date <= max)
//            {
//                tr[i].style.display = "";
//            }
//            else
//            {
//                tr[i].style.display = "none";
//            }
//        }
//    }
//}



function SubmitFunc() {
    var tbl = document.getElementById("table");
    //var row = tbl.insertRow();
    var col1 = document.getElementById("jdate").value;
    var col2 = document.getElementById("pnav").value;
    var col3 = document.getElementById("snav").value;
    var col4 = document.getElementById("nav").value;
    var newRow = {
        "Time": "",
        "JalaliDate": col1,
        "PurchaseNAVPerShare": col2,
        "SellNAVPerShare": col3,
        "StatisticalNAVPerShare": 0,
        "IssuedUnits": 0,
        "AccumulativeIssuedUnits": 0,
        "RevocedUnits": 0,
        "AccumulativeRevocedUnits": 0,
        "Units": 0,
        "NAV": col4
    }
;
    var list = [];
    list = JSON.parse(localStorage.getItem("data")) || [];
    list.push(newRow);   
    localStorage.setItem('data', JSON.stringify(list));
}

var DateCleave = new Cleave('.input-date1', {
    date: true,
    delimiter: '/',
    datePattern: ['Y', 'm', 'd']
});
var DateCleave = new Cleave('.input-date2', {
    date: true,
    delimiter: '/',
    datePattern: ['Y', 'm', 'd']
});

var NumCleave = new Cleave('.input-num1', {
    numeral: true,
    numeralThousandsGroupStyle: 'thousand'
});
var NumCleave = new Cleave('.input-num2', {
    numeral: true,
    numeralThousandsGroupStyle: 'thousand'
});
var NumCleave = new Cleave('.input-num3', {
    numeral: true,
    numeralThousandsGroupStyle: 'thousand'
});
var NumCleave = new Cleave('.input-num4', {
    numeral: true,
    numeralThousandsGroupStyle: 'thousand'
});
var NumCleave = new Cleave('.input-num5', {
    numeral: true,
    numeralThousandsGroupStyle: 'thousand'
});
var NumCleave = new Cleave('.input-num6', {
    numeral: true,
    numeralThousandsGroupStyle: 'thousand'
});