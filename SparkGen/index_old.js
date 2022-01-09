
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
    $(document).on('click', '#btnGenerate', function () {
        alert('');
        document.getElementsByClassName('cm-variable')[0].innerText = 'abc'; 
        debugger;
        var extensions = ['json', 'csv', 'txt', 'parquet'];

        $.each(extensions, function (value) {
            alert('');
            $('#sourceSel').append('<option value="' + extensions[value] + '">' + extensions[value] + '</option>');
        });
    });


   

    
});

