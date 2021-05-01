$(document).ready(function () {
    const service = window.location.pathname.split('/')[1]
    const url = `${window.location.protocol}//${window.location.hostname}/${service}`
    $('#service-form').submit(async function (e) {
        e.preventDefault()
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: $('#service-form').serialize()
        })
        if (response.status === 201) {
            $('.invalid-feedback').html('')
            $('#success').html('Your data was recieved successfully.')
        }
        else {
            const data = await response.json()
            const errors = Object.keys(data.errors)
            errors.forEach((error) => {
                $(`#${error}-feedback`).html(data.errors[error].message)
            })
        }
    })
})