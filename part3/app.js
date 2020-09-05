$(function () {

    //EVENT LISTENERS =>
    $('form').on('submit', handleSubmitForm)
    $('tbody').on('click', handleClickDelete)
    $('.sort').on('click', sortMovies)


    //EVENT HANDLERS =>
    let moviesArray = {} //All movie titles and ratings go in here as nested objects with the name as key

    //Recieves input values and calls addMovie() helper function to render to the DOM
    function handleSubmitForm(e) {
        e.preventDefault();
        let title = $('#title').val()
        let rating = $('#rating').val()
        if (title !== '') {
            addMovie(title, rating)
            moviesArray[title] = { name: title, rating: rating }
            $('#title').val('')
            $('#rating').val(0)
        }
    }

    //Deletes movies when called
    function handleClickDelete(e) {
        let item = $(e.target).parent()
        if ($(e.target).text() === 'Delete') {
            item.remove()
        }
    }

    //Makes use of 6 helper functions to sort movies by the parameters passed, one of the helpers calls addMovie() which renders the sorted movies to the DOM
    function sortMovies(e) {
        let movieTitles = []
        let movieRatings = []
        let sortedTitles
        let sortedRatings
        $('tbody').text('')
        for (let movie in moviesArray) {
            movieTitles.push(moviesArray[movie].name)
            movieRatings.push(moviesArray[movie].rating)
        }
        if ($(e.target).data('item') === 'sortNameUp') {
            sortedTitles = sortNameUp(movieTitles)
            sortByTitle(sortedTitles)
        }
        if ($(e.target).data('item') === 'sortNameDown') {
            sortedTitles = sortNameDown(movieTitles)
            sortByTitle(sortedTitles)
        }
        if ($(e.target).data('item') === 'sortRatingUp') {
            sortedRatings = sortRatingUp(movieRatings)
            sortByRatings(sortedRatings)
        }
        if ($(e.target).data('item') === 'sortRatingDown') {
            sortedRatings = sortRatingDown(movieRatings)
            sortByRatings(sortedRatings)
        }
    }


    //HELPER FUNCTIONS =>

    //this function adds the movie to the DOM
    let check = true
    function addMovie(title, rating) {
        let newMovie = $('<tr>').addClass('d-flex bg-light')
        if (check) {
            newMovie.toggleClass('bg-light')
            check = false
        }
        else {
            check = true
        }
        newMovie.html(`
    <td class="col-8" scope='col'>${title}</td>
    <td class="col-2" scope='col'>${rating}</td>
    <td class="col-2 btn btn-danger m-1" scope='col'>Delete</td>
    `)
        $('tbody').append(newMovie)
    }

    //This function sorts movie names in ascending order
    function sortNameUp(arr) {
        return arr.sort()
    }

    //This function sorts in descending order
    function sortNameDown(arr) {
        let list = arr.sort()
        let newList = []
        for (let i = list.length - 1; i > 0; i--) {
            newList.push(list[i])
        }
        newList.push(list.slice(0)[0])
        return newList
    }

    //Sort movie ratings in ascendind order
    function sortRatingUp(movieRatings) {
        return Array.from(new Set(movieRatings.sort()))
    }

    //Sorts in descending order
    function sortRatingDown(movieRatings) {
        let userRatings = sortRatingUp(movieRatings)
        let sortInDescendingOrder = []
        for (let i = userRatings.length - 1; i >= 0; i--) {
            console.log(userRatings[i])
            sortInDescendingOrder.push(userRatings[i])
        }
        return sortInDescendingOrder
    }

    //This function accepts the earlier sorted ratings array as an argument and calls addMovie to render to the DOM
    function sortByRatings(ratingsArray) {
        return ratingsArray.map(val => {
            for (let key in moviesArray) {
                if (moviesArray[key].rating === val) {
                    addMovie(moviesArray[key].name, moviesArray[key].rating)
                }
            }
        })
    }

    //Does same for the title
    function sortByTitle(titlesArray) {
        return titlesArray.map(val => {
            addMovie(moviesArray[val].name, moviesArray[val].rating)
        })
    }

    $('[data-toggle="sortNameUp"]').tooltip()
    $('[data-toggle="sortNameDown"]').tooltip()
    $('[data-toggle="sortRatingUp"]').tooltip()
    $('[data-toggle="sortRatingDown"]').tooltip()
    $('[data-toggle="link"]').tooltip()

})