
local Player = {} 
local Grm = (GetResourceState("grm-characters") == "started" or GetResourceState("grm-core") == "started")

if GetResourceState("es_extended") ~= "missing" then
    local ESX = exports.es_extended:getSharedObject()
    
    Player.Loaded = ESX.PlayerLoaded

    AddEventHandler("playerSpawned", function()
        Player.Loaded = true
        TriggerEvent("cosmo_hud:toggle", true)
    end)
    AddEventHandler("esx_status:OnTick", function(status)
        Player.Status = status
    end)
    RegisterNetEvent("esx:onPlayerLogout", function()
        Player.Loaded = false
        TriggerEvent("cosmo_hud:toggle", false)
    end)
elseif GetResourceState("qb-core") ~= "missing" then 
    Player.Loaded = LocalPlayer.state.loggedIn

    RegisterNetEvent('QBCore:Client:OnPlayerLoaded', function()
        Player.Loaded = true
    end)
    RegisterNetEvent('QBCore:Client:OnPlayerUnload', function()
        Player.Loaded = false
    end)
end

return {
    IsPlayerLoaded = function()
        return Player.Loaded or (Grm and LocalPlayer.state.grm_characters_loaded)
    end,
    GetPlayerStatus = function()
        return Player.Status or {}
    end
}