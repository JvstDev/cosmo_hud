
local Components = {
	Config = require 'config',
	Speedometer = require 'components.speedometer.client',
	Bridge = require 'components.bridge.client',
	Seatbelt = require 'components.seatbelt.client',
	Hud = require 'components.hud.client'
}

---@return void
local function check_mumble_connection()
	if MumbleIsConnected() then 
		if not voice_connected then 
			voice_connected = true 
			TriggerEvent("cosmo_hud:voice_connected", true)
		end
	else
		if voice_connected then 
			voice_connected = false 
			TriggerEvent("cosmo_hud:voice_connected", false)
		end
	end
end

---@param vehicle string|nil
---@return void
local function handle_vehicle_things(vehicle)
	if Components.Bridge.IsPlayerLoaded() then
		if vehicle then 
			if not Components.Config.AlwaysShowRadar then 
				DisplayRadar(true)
			end
			if Components.Config.ShowSpeedo then 
				Components.Speedometer.Display(true)
				Components.Speedometer.Loop(vehicle, Components.Config.UnitOfSpeed)
			end
		else
			if not Components.Config.AlwaysShowRadar then 
				DisplayRadar(false)
			end
			if Components.Config.ShowSpeedo then 
				Components.Speedometer.Display(false)
			end
		end
	end
end

---@return void
local function init_minimap()
	DisplayRadar(Components.Config.AlwaysShowRadar)
	lib.requestStreamedTextureDict("circlemap")
	AddReplaceTexture("platform:/textures/graphics", "radarmasksm", "circlemap", "radarmasksm")
	SetMinimapClipType(1)
	SetMinimapComponentPosition('minimap', 'L', 'B', -0.025, -0.015, 0.16, 0.25)
	SetMinimapComponentPosition('minimap_mask', 'L', 'B', 0.145, -0.015, 0.072, 0.162)
	SetMinimapComponentPosition('minimap_blur', 'L', 'B', -0.035, -0.03, 0.18, 0.22)
	SetMapZoomDataLevel(0, 0.96, 0.9, 0.08, 0.0, 0.0) -- Level 0
	SetMapZoomDataLevel(1, 1.6, 0.9, 0.08, 0.0, 0.0) -- Level 1
	SetMapZoomDataLevel(2, 8.6, 0.9, 0.08, 0.0, 0.0) -- Level 2
	SetMapZoomDataLevel(3, 12.3, 0.9, 0.08, 0.0, 0.0) -- Level 3
	SetMapZoomDataLevel(4, 22.3, 0.9, 0.08, 0.0, 0.0) -- Level 4
	Wait(1000)
	SetRadarBigmapEnabled(true, false)
	Wait(0)
	SetRadarBigmapEnabled(false, false)
	SetRadarZoom(1100)
	Components.Hud.State(true)
	Components.Hud.UpdateServerId(cache.serverId)
	handle_vehicle_things(cache.vehicle)
end

AddEventHandler("playerSpawned", function()
	init_minimap()
end)

lib.onCache("vehicle", function(vehicle)
	handle_vehicle_things(vehicle)
end)

AddEventHandler("cosmo_hud:toggle", function(state)
	Components.Hud.State(state)
end)

AddEventHandler("cosmo_hud:voice_connected", function(state)
	Components.Hud.VoiceState(state)
end)

AddEventHandler("pma-voice:radioActive", function(state) 
	Components.Hud.Radio(state)
end)

AddEventHandler("pma-voice:setTalkingMode", function(mode)
	Components.Hud.VoiceLevel(mode)
end)

CreateThread(
	function()
		if Components.Bridge.IsPlayerLoaded() then
			init_minimap()
		end
	end
)

CreateThread(
	function()
		while true do
			Wait(150)
			if Components.Bridge.IsPlayerLoaded() then
				SetRadarZoom(LocalPlayer.state.radar_zoom or 1100)
				check_mumble_connection()
				Components.Hud.Sync({
					health = GetEntityHealth(cache.ped),
					armour = GetPedArmour(cache.ped),
					oxygen = GetPlayerUnderwaterTimeRemaining(cache.playerId) * 10,
					talking = NetworkIsPlayerTalking(cache.playerId),
					stamina = GetPlayerStamina(cache.playerId),
					status = Components.Bridge.GetPlayerStatus()
				})
			end
		end
	end
)