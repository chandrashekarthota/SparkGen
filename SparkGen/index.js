
document.addEventListener('readystatechange', event => {
    if (event.target.readyState === "complete") {
        setTimeout(function () {
            const abc = document.createElement('div');
            abc.innerText = "Build Query";
            abc.id = "btnBuildQuery";
            document.getElementsByClassName('context-bar__left')[0].append(abc);
        }, 5000);
    }
});

document.addEventListener('click', function (e) {
    if (e.target && e.target.id == 'btnBuildQuery') {
        setTimeout(function () {
            const def = document.createElement('div');
            def.id = "queryContainer";
            //document.getElementsByClassName('context-bar__left')[0].append(def);
            document.getElementsByClassName('cellIndex-0')[0].append(def);
            $('#queryContainer').load(chrome.runtime.getURL('queryform.html'));
        }, 1000);
        e.preventDefault();
    }
});

$(document).ready(function () {

    var selectstring = '';
    var dfReadSource = '';
    var conditionsString='';

    var checkContents = setInterval(function () {
        if (document.getElementById('queryBuilder')) {

            //binding extensions to dropdown
            var extensions = ['json', 'csv', 'txt', 'parquet'];
            $.each(extensions, function (value) {
                $('#sourceSel').append('<option value="' + extensions[value] + '">' + extensions[value] + '</option>');
            });

            //binding conditions to dropdown
            var conditions = ['filter', 'where', 'when', 'like', 'startswith', 'endswith', 'substring', 'between'];
            $.each(conditions, function (value) {
                $('#condiSel').append('<option value="' + conditions[value] + '">' + conditions[value] + '</option>');
            });

            //binding columns to dropdowns
            $('#txtHeaders').change(function () {
                $('#colSelect,#groupBySel,#filterBySel,#sortByCol,#filterBySel').empty();
                var headers = $('#txtHeaders').val();
                var cols = headers.split(',');
                $.each(cols, function (value) {
                    $('#colSelect,#groupBySel,#filterBySel,#sortByCol,#filterBySel').append('<option value="' + cols[value] + '">' + cols[value] + '</option>');
                });
            });



            //handling select columns
            $('#colSelect').change(function () {
                if ($('#colSelect').val()) {

                    var selectedColsString = $('#colSelect option:selected').toArray().map(item => item.text).join();
                    var selectedColsArray = selectedColsString.split(',');
                    if (selectedColsArray.length) {
                        var selstr = '';
                        for (var i = 0; i < selectedColsArray.length; i++) {
                            selstr += '"' + selectedColsArray[i] + '"' + ',';
                        }
                        selectstring = '.select(' + selstr + ')';
                    }
                }

            });

            //building conditions


            clearInterval(checkContents);
        }
    }, 1);

    //clone and add new dataframe form
    $(document).on('click', '#addDataFrame', function () {
        $(".dfContainer").clone().appendTo(".dfContainer");
    });

    //generating commands finally
    $(document).on('click', '#btnGenerate', function () {
        var query = '';
        var sourceType = $('#sourceSel').val();
        var load = getLoadType(sourceType);
        var filePath = $('#txtFileName').val();
        dfReadSource = readDataFrame(sourceType, load, filePath);

        //read file
        query += dfReadSource;

        //select columns
        query += selectstring;

        //adding filter conditions

        //show df
        query += '  df.show()';
        document.getElementsByClassName('cm-variable')[0].innerHTML = query;
    });
});

//handling reading dataframe source
function readDataFrame(sourceType, load, filePath) {
    return 'df = spark.read.format("' + sourceType + '").' + load + '("' + filePath + '")';
}

function getLoadType(sourceType) {

    var load = 'load';

    if (sourceType == 'json') {
        load = 'json';
    }

    if (sourceType == 'txt') {
        load = 'text';
    }

    return load;

}

