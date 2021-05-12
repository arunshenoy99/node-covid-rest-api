$(document).ready(function () {
    $('.spinner-wrapper').fadeOut(500)
    $('#otp-form').submit(async function (e) {
        const otpUrl = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/otp`
        const $otpInput = $('#otp')

        e.preventDefault()

        const response = await fetch(otpUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ otp: $otpInput.val() })
        })

        if (response.status == 400) {
            const data = await response.json()
            return $('#otp-feedback').html(data.error)
        }

        if (response.status == 429) {
            return $('#otp-feedback').html('Too many tries, please try again after some time.')
        }

        if (response.status == 200) {
            const data = await response.json()
            window.location.href = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/${data.path}`
        }
    })

    var resendInterval = setInterval(counter, 1000)
    var count = 25

    function counter () {
        count = count - 1
        $('#resend-button').html(`Resend in ${count}s`)

        if (count === 0) {
            $('#resend-button').html('Resend')
            $('#resend-button').prop('disabled', false)
            clearInterval(resendInterval)
        }
    }

    $('#resend-button').click(resend)

    async function resend() {
        const resendUrl = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/otp/resend`

        const response = await fetch(resendUrl, {
            method: 'POST'
        })

        if (response.status === 200) {
            $('.valid-feedback').html('OTP was resent.')
            $('#resend-button').prop('disabled', true)
            count = 25
            resendInterval = setInterval(counter, 1000)
        } else {
            $('.invalid-feedback').html('Error resending OTP please try some time later.')
        }
        
    } 
})