fx_version 'cerulean'
name 'cosmo_hud'
description 'cosmo_hud for fivem, uses library from loading.io'
author 'CosmoKramer'
game 'gta5'

ui_page 'web/ui.html'

shared_scripts {
    '@es_extended/imports.lua',
    '@ox_lib/init.lua'
}

client_scripts {
    'client.lua'
}

files {
    'web/ui.html',
    'web/script.js',
    'web/style.css',
    'web/loading-bar.js',
    'config.lua',
    'components/**/client.lua'
}