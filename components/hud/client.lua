return {
    State = function(bool)
        SendNUIMessage({ action = "show_ui", state = bool })
    end,
    UpdateServerId = function(value)
        SendNUIMessage({ action = "update_server_id", id = value })
    end,
    VoiceLevel = function(range)
        SendNUIMessage({ action = "update_voice_level", level = range })
    end,
    VoiceState = function(bool)
        SendNUIMessage({ action = "update_voice_state", state = bool })
    end,
    Radio = function(bool)
        SendNUIMessage({ action = "set_radio_state", state = bool })
    end,
    Sync = function(data)
        SendNUIMessage({
            status = {
                hunger = data.status.hunger,
                thirst = data.status.thirst,
                stress = data.status.stress,
                drugs = data.status.drugs, -- Grm gamemodes
                drunk = data.status.drunk -- Grm gamemodes
            },
            action = "update_hud",
            health = data.health - 100,
            armor = data.armour,
            oxygen = data.oxygen,
            talking = data.talking,
            stamina = math.floor(data.stamina)
        })
    end
}