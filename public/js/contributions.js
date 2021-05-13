$(document).ready(function () {
    $('.spinner-wrapper').fadeOut(500)
    
    $('.validate-btn').click(async function () {
        const id = $(this).attr('id').replace('valid-', '')
        const url = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/data/contributions/${id}`
        const response = await fetch(url, {
            method: 'POST'
        })
        if (response.status == 200) {
            $(`#card-${id}`).fadeOut(500)
        } else {
            $(`#status-${id}`).html('There was an error validating the response')
        }
    })

    $('.invalidate-btn').click(async function () {
        const id = $(this).attr('id').replace('invalid-', '')
        const url = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/data/contributions/${id}`
        const response = await fetch(url, {
            method: 'DELETE'
        })
        if (response.status == 200) {
            $(`#card-${id}`).fadeOut(500)
        } else {
            $(`#status-${id}`).html('There was an error validating the response')
        }
    })
})