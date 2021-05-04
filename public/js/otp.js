$(document).ready(function () {
    const url = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/otp`
    const $otpInput = $('#otp')
    $('#otp-form').submit(async function (e) {
        e.preventDefault()
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ otp: $otpInput.val() })
        })
        const data = await response.json()
        if (response.status == 400) {
            return $('#otp-feedback').html(data.error)
        }
        if (response.status == 200) {
            window.location.href = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/${data.path}`
        }
    })
})