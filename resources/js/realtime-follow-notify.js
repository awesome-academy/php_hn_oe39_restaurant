import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import I18n from './vendor/I18n';
window.I18n = I18n;

const echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.MIX_PUSHER_APP_KEY,
    cluster: process.env.MIX_PUSHER_APP_CLUSTER,
    forceTLS: true
});

Pusher.logToConsole = true;
let id = $('#user_id').val();
let translator = new I18n;

let today = new Date();
let date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

let currentNotiCount = $('.notification-count').text();

echo.private(`users.${id}`).notification((notification) => {
    var newNotificationHtml = `
            <a href="{{ route('users.show', ${notification.user['id']}) }}" class="dropdown-item">
                <i class="fas fa-user-friends mr-2"></i>
                <span>${notification.user['username']} ` + translator.trans('messages.follow') +
            `   </span>
                <span class="float-right text-muted text-sm">${date}</span>
            </a>
        `;
    $('.menu-notification').prepend(newNotificationHtml);
    currentNotiCount++;
    $('.notification-count').text(currentNotiCount);
});
