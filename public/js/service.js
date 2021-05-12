$(document).ready(function () {
    $('.spinner-wrapper').fadeOut(500)
    const service = window.location.pathname.split('/')[1]
    const url = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/${service}`
    $('#service-form').submit(async function (e) {
        e.preventDefault()
        $('#service-form-submit').attr('disabled', true)
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: $('#service-form').serialize()
        })
        if (response.status === 201) {
            $('.invalid-feedback').html('')
            $('#successModal').modal('show')
        }
        else {
            $('.invalid-feedback').html('')
            const data = await response.json()
            const errors = Object.keys(data.errors)
            errors.forEach((error) => {
                $(`[id='${error}-feedback']`).html(data.errors[error].message)
            })
        }
        $('#service-form-submit').attr('disabled', false)
    })
})