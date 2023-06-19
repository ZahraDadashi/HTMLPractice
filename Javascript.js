
function SubmitFunc() {
    var tbl = document.getElementById("table");
    var row = tbl.insertRow();
    var col1 = row.insertCell();
    var col2 = row.insertCell();
    var col3 = row.insertCell();
    var col4 = row.insertCell();
    col1.innerHTML = document.getElementById("jdate").value;
    col2.innerHTML = document.getElementById("pnav").value;
    col3.innerHTML = document.getElementById("snav").value;
    col4.innerHTML = document.getElementById("nav").value;
}

var table = document.querySelector("#table");
var LoadMoreButton = document.querySelector("#load-more-button");
const tableHead = table.querySelector("thead");
const tableBody = table.querySelector("tbody");

var initialItems = 10;
var loadItems = 10;


fetch("http://parsianlotusfund.ir/data/nav")
    .then(response => response.json())
    .then(data => {
        localStorage.setItem("data", JSON.stringify(data.data));
    });


function loadIntoTable() {

    var out = "";
    var counter = 0;
    const data = JSON.parse(localStorage.getItem("data"));

    for (const row of data) {
        if (counter < initialItems) {
            out += `
        <tr >
        <td class=data>${row.JalaliDate}</td>
        <td class=data>${row.PurchaseNAVPerShare.toLocaleString("en-US")}</td>
        <td class=data>${row.SellNAVPerShare.toLocaleString("en-US")}</td>
        <td class=data>${row.NAV.toLocaleString("en-US")}</td>
        </tr>
`;
        }
        counter++;
    }
    tableBody.innerHTML = out;
}

function loadMoreButton() {
    const data = JSON.parse(localStorage.getItem("data"));
    const currentDisplayedItems = document.querySelectorAll(".data").length;
    var out = "";
    var counter = 0;
    for (const row of data) {
        if (counter >= currentDisplayedItems && counter < loadItems + currentDisplayedItems) {
            out += `
        <tr>
        <td class=data>${row.JalaliDate}</td>
        <td class=data>${row.PurchaseNAVPerShare.toLocaleString("en-US")}</td>
        <td class=data>${row.SellNAVPerShare.toLocaleString("en-US")}</td>
        <td class=data>${row.NAV.toLocaleString("en-US")}</td>
        </tr>
`;

        }
        counter++;

    }
    tableBody.innerHTML += out;
    if (document.querySelectorAll(".data").length == data.length) {
        LoadMoreButton.style.display = "none";
    }
}

loadIntoTable();

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

