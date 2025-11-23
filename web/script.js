$(document).ready(function () {
  HealthIndicator = new ProgressBar.Circle("#HealthIndicator", {
    color: "rgb(33, 171, 97)",
    trailColor: "#4a4a4a",
    strokeWidth: 8,
    trailWidth: 8,
    duration: 250,
    easing: "easeInOut",
  });
  ArmorIndicator = new ProgressBar.Circle("#ArmorIndicator", {
    color: "rgba(50, 109, 191, 1)",
    trailColor: "#4a4a4a",
    strokeWidth: 8,
    trailWidth: 8,
    duration: 250,
    easing: "easeInOut",
  });
  HungerIndicator = new ProgressBar.Circle("#HungerIndicator", {
    color: "rgba(221, 110, 20, 1)",
    trailColor: "#4a4a4a",
    strokeWidth: 8,
    trailWidth: 8,
    duration: 250,
    easing: "easeInOut",
  });
  ThirstIndicator = new ProgressBar.Circle("#ThirstIndicator", {
    color: "rgba(26, 124, 173, 1)",
    trailColor: "#4a4a4a",
    strokeWidth: 8,
    trailWidth: 8,
    duration: 250,
    easing: "easeInOut",
  });
  StressIndicator = new ProgressBar.Circle("#StressIndicator", {
    color: "rgba(207, 26, 26, 1)",
    trailColor: "#4a4a4a",
    strokeWidth: 8,
    trailWidth: 8,
    duration: 250,
    easing: "easeInOut",
  });
  DrugsIndicator = new ProgressBar.Circle("#DrugsIndicator", {
    color: "rgba(85, 161, 55, 1)",
    trailColor: "#4a4a4a",
    strokeWidth: 8,
    trailWidth: 8,
    duration: 250,
    easing: "easeInOut",
  });
  DrunkIndicator = new ProgressBar.Circle("#DrunkIndicator", {
    color: "rgba(138, 95, 56, 1)",
    trailColor: "#4a4a4a",
    strokeWidth: 8,
    trailWidth: 8,
    duration: 250,
    easing: "easeInOut",
  });
  OxygenIndicator = new ProgressBar.Circle("#OxygenIndicator", {
    color: "rgb(138, 168, 189)",
    trailColor: "#4a4a4a",
    strokeWidth: 8,
    trailWidth: 8,
    duration: 250,
    easing: "easeInOut",
  });
  StaminaIndicator = new ProgressBar.Circle("#StaminaIndicator", {
    color: "rgb(255, 74, 104)",
    trailColor: "#4a4a4a",
    strokeWidth: 8,
    trailWidth: 8,
    duration: 250,
    easing: "easeInOut",
  });
  Speedometer = new ProgressBar.Circle("#SpeedCircle", {
    color: "rgba(222, 222, 222, 1)",
    trailColor: "rgba(184, 184, 184, 0.082)",
    strokeWidth: 6,
    duration: 100,
    trailWidth: 6,
    easing: "easeInOut",
  });
  FuelIndicator = new ProgressBar.Circle("#FuelCircle", {
    color: "rgba(222, 222, 222, 1)",
    trailColor: "rgba(184, 184, 184, 0.082)",
    strokeWidth: 8,
    duration: 250,
    trailWidth: 8,
    easing: "easeInOut",
  });
  VoiceIndicator = new ProgressBar.Circle("#VoiceIndicator", {
    color: "#4a4a4a",
    trailColor: "#4a4a4a",
    strokeWidth: 8,
    trailWidth: 8,
    duration: 250,
    easing: "easeInOut",
  });
  VoiceIndicator.animate(0.66);
});

function UpdateStatus(status) {
  if (status.thirst < 25) {
    $("#ThirstIcon").toggleClass("flash");
  } else if (status.thirst > 90) {
    $("#ThirstIndicator").hide();
  }
  if (status.hunger < 25) {
    $("#HungerIcon").toggleClass("flash");
  } else if (status.hunger > 90) {
    $("#HungerIndicator").hide();
  }
  if (status.stress <= 0) {
    $("#StressIndicator").hide();
  } else {
    StressIndicator.animate(status.stress / 100);
  }
  if (status.drugs <= 0) {
    $("#DrugsIndicator").hide();
  } else {
    DrugsIndicator.animate(status.drugs / 100);
  }
  if (status.drunk <= 0) {
    $("#DrunkIndicator").hide();
  } else {
    DrunkIndicator.animate(status.drunk / 100);
  }
  HungerIndicator.animate(status.hunger / 100);
  ThirstIndicator.animate(status.thirst / 100);
}

function UpdateHud(data) {
  if (data.health <= 0) {
    HealthIndicator.animate(0);
    $("#hp-icon").removeClass("fa-heart");
    $("#hp-icon").addClass("fa-skull");
  } else if (data.health > 0) {
    $("#hp-icon").removeClass("fa-skull");
    $("#hp-icon").addClass("fa-heart");
  }
  if (data.armor == 0) {
    $("#ArmorIndicator").fadeOut();
  } else if (data.armor > 0) {
    $("#ArmorIndicator").fadeIn();
  }
  if (data.oxygen < 100) {
    $("#OxygenIndicator").show();
  } else {
    $("#OxygenIndicator").hide();
  }
  if (data.stamina < 100) {
    $("#StaminaIndicator").show();
  } else {
    $("#StaminaIndicator").hide();
  }
  UpdateStatus(data.status)
  HealthIndicator.animate(data.health / 100);
  ArmorIndicator.animate(data.armor / 100);
  OxygenIndicator.animate(data.oxygen / 100);
  StaminaIndicator.animate(data.stamina / 100);
  VoiceIndicator.path.setAttribute("stroke", data.talking && "yellow" || "darkgrey")
}

window.addEventListener("message", function (event) {
  switch(event.data.action) {
    case "toggle_hud":
      $("body").fadeToggle()
      break
    case "show_ui":
      if (event.data.state) {
        $(".container").show();
      } else {
        $(".container").hide();
      }
    case "update_voice_state": 
      if (event.data.state) {
        $("#VoiceIcon").removeClass("fa-microphone-slash");	 
        $("#VoiceIcon").addClass("fa-microphone");	
      } else {
        $("#VoiceIcon").removeClass("fa-microphone");
        $("#VoiceIcon").addClass("fa-microphone-slash");
      }
      break 
    case "show_oxygen":
      break
    case "update_hud":
      UpdateHud(event.data)
      break
    case "show_speedometer":
      if (event.data.state) {
        $("#VehicleContainer").fadeIn()
        $("#FuelCircle").show();
      } else {
        $("#VehicleContainer").fadeOut()
        $("#FuelCircle").hide();
      }
      break
    case "update_speedometer":
      if (event.data.fuel < 15) {
        $("#FuelIndicator").toggleClass("flash");
      } else {
        FuelIndicator.animate(event.data.fuel / 100);
      }
      if (event.data.speed > 0) {
        $("#SpeedIndicator").text(event.data.speed);
        let multiplier = event.data.maxspeed * 0.1;
        let SpeedoLimit = event.data.maxspeed + multiplier;
        Speedometer.animate(event.data.speed / SpeedoLimit);
        Speedometer.path.setAttribute("stroke", "white");
      } else if (event.data.speed == 0) {
        $("#SpeedIndicator").text("0");
        Speedometer.path.setAttribute("stroke", "none");
      }
      break
    case "update_server_id": 
      document.getElementById("IdIcon").innerHTML = event.data.id
      break
    case "set_radio_state":
      if (event.data.state) {
        $("#VoiceIcon").removeClass("fa-microphone");
        $("#VoiceIcon").addClass("fa-headset");
      } else {
        $("#VoiceIcon").removeClass("fa-headset");
        $("#VoiceIcon").addClass("fa-microphone");
      }
      break
    case "update_voice_level": 
      switch (event.data.level) {
        case 1:
          event.data.level = 33;
          break;
        case 2:
          event.data.level = 66;
          break;
        case 3:
          event.data.level = 100;
          break;
      }
      VoiceIndicator.animate(event.data.level / 100);
      break 
  }
});