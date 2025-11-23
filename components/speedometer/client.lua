
local multiplier = {
    ['mph'] = 2.236936,
    ["kmh"] = 3.6
}

return {
    Display = function(bool)
        SendNUIMessage({
            action = "show_speedometer",
            state = bool
        })
    end,
    Loop = function(vehicle, unit)
        CreateThread(function()
            while cache.vehicle == vehicle do
                SendNUIMessage({
                    action = "update_speedometer",
                    speed = math.floor(GetEntitySpeed(vehicle) * multiplier[unit]), 
                    maxspeed = math.floor(GetVehicleModelMaxSpeed(GetEntityModel(vehicle)) * multiplier[unit]),
                    fuel = math.floor(GetVehicleFuelLevel(vehicle))
                })
                Wait(100)
            end
        end)
    end
}