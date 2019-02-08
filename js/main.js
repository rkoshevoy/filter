$(document).ready(function () {
    (function () {
        var storesCities = [],
            table = $('.sale-places-table');

        var originalTableArray = $('.sale-places-table table tr').map(function (i, v) {
            var td = $('td', this);
            return {
                city: td.eq(0).text().trim(),
                address: td.eq(1).text(),
                phone: td.eq(2).text(),
                name: td.eq(3).text()
            }
        }).get();

        for (var i = 0; i < originalTableArray.length; i++) {
            if (storesCities.indexOf(originalTableArray[i].city) == -1) {
                storesCities.push(originalTableArray[i].city);
            }
        }

        storesCities.sort();
        storesCities.unshift('Все города')

        var selectLayout = '';

        selectLayout += '<div id="filter-select" class="filter-select">';
        selectLayout += '<span id="selected-city" class="selected-city">';
        selectLayout += storesCities[0];
        selectLayout += '</span>';
        selectLayout += '<div id="dropdown" class="dropdown">';

        selectLayout += '<input type="text" id="filter-input" name="city" autocomplete="off" placeholder="Введите название города">';

        selectLayout += '<ul class="options">';

        for (var i = 0; i < storesCities.length; i++) {
            selectLayout += '<li class="option">' + storesCities[i] + '</li>';
        }

        selectLayout += '</ul>';

        selectLayout += '<span class="no-coincidence">Нет совпадений</span>';

        selectLayout += '</div>';
        selectLayout += '</div>';

        $('#stores-filter').append(selectLayout);

        $('#dropdown .option').eq(0).addClass('selected');

        $('#filter-input').on('input', function () {
            var inputLength = $(this).val().length;

            if (inputLength > 0) {
                for (var i = 0; i < $('#dropdown .option').length; i++) {
                    if ($(this).val().toUpperCase() == $('#dropdown .option').eq(i).text().substring(0, inputLength).toUpperCase()) {
                        $('#dropdown .option').eq(i).removeClass('hidden');
                    } else {
                        $('#dropdown .option').eq(i).addClass('hidden');
                    }
                }

                if ($('#dropdown .option.hidden').length == $('#dropdown .option').length) {
                    $('#dropdown .no-coincidence').css('display', 'block');
                } else {;
                    $('#dropdown .no-coincidence').css('display', 'none');
                }

            } else {
                $('#dropdown .option').removeClass('hidden');
                $('#dropdown .no-coincidence').css('display', 'none');
            }
        })

        var selectedOption = storesCities[0],
            newTableArray = [],
            newTable = '';

        $('#dropdown .option').click(function () {
            selectedOption = $(this).text();
            newTableArray = [];

            $('#selected-city').text(selectedOption);
            $('#dropdown').removeClass('visible');
            $('#dropdown .option').removeClass('selected');
            $(this).addClass('selected');

            setTimeout(function () {
                $('#filter-input').val('');
                $('#dropdown .option').removeClass('hidden');
            }, 300)

            if (selectedOption == 'Все города' || selectedOption == 'Всі міста') {
                newTableArray = originalTableArray;
            } else {
                for (var i = 0; i < originalTableArray.length; i++) {
                    if (selectedOption == originalTableArray[i].city) {
                        newTableArray.push({
                            city: originalTableArray[i].city,
                            address: originalTableArray[i].address,
                            phone: originalTableArray[i].phone,
                            name: originalTableArray[i].name
                        })
                    }
                }
            }

            newTable = '';

            newTable += '<table>';
            newTable += '<tbody>';

            for (var i = 0; i < newTableArray.length; i++) {
                newTable += '<tr>';
                newTable += '<td>';
                newTable += newTableArray[i].city;
                newTable += '</td>';
                newTable += '<td>';
                newTable += newTableArray[i].address;
                newTable += '</td>';
                newTable += '<td>';
                newTable += newTableArray[i].phone;
                newTable += '</td>';
                newTable += '<td>';
                newTable += newTableArray[i].name;
                newTable += '</td>';
                newTable += '</tr>';
            }

            newTable += '</tbody>';
            newTable += '</table>';

            $('.sale-places-table').empty().append(newTable);
        });
    })();

    $('#selected-city').click(function () {
        $(this).siblings('#dropdown').toggleClass('visible');
    });
});
