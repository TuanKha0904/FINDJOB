app.filter('currencyFormat', ['$filter', function ($filter) {
    return function (input) {
        if (isNaN(input)) return input;

        // Sử dụng hàm number để định dạng số
        var formattedNumber = $filter('number')(input, 0);
        return formattedNumber.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."); // Thêm dấu chấm
    };
}]);