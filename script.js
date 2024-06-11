
function isTouchScreen() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

if (isTouchScreen()) {
  window.alert("Workout Generator does not work on mobile devices, please use a desktop.")
}

x = 0
y = 0

const scheduleCards = document.getElementsByClassName("schedule-card")
const helperCard = document.getElementById("helper-card")
const canvas = document.getElementById("canvas")

selectedSchedule = undefined

{
    canvas.addEventListener('mousedown', (e) => {
      if ((e.button == 0) && (e.target.id == "generate" || (e.target.parentNode && e.target.parentNode.id == "generate"))) {
        generate()
      }
      if ((e.button == 1 || e.button == 2) && e.target.parentNode.className == "exercise-schedule") {
          e.target.parentNode.remove()
      }
      if ((e.button == 1 || e.button == 2) && e.target.className == "exercise-schedule") {
        e.target.remove()
      }
      if (e.target.parentNode && e.target.parentNode.id == "header") {
          if (selectedSchedule == undefined) {
              style = document.createElement("style")
              style.innerHTML = ".exercise-card { background-color: var(--light); } .exercise-card:hover { background-color: var(--gray); }"
              document.head.appendChild(style)
          } else if (selectedSchedule != undefined) {
              selectedSchedule.style["background-color"] = "#FAFAFB"
          }
          selectedSchedule = e.target.parentNode
          selectedSchedule.style["background-color"] = "#610C04"
      }
    })

    sX = 0
    sY = 0
    nX = 0
    nY = 0

    canvas.addEventListener('mousedown', mouseDown)

    function mouseDown(e) {
        if (e.target == canvas) {
            sX = e.clientX
            sY = e.clientY

            function mouseMove(e) {
                nX = sX - e.clientX
                nY = sY - e.clientY

                sX = e.clientX
                sY = e.clientY

                for (i = 0; i < scheduleCards.length; i++) {
                    card = scheduleCards[i]
                    card.style.top = (card.offsetTop - nY) + "px"
                    card.style.left = (card.offsetLeft - nX) + "px"
                }
                helperCard.style.top = (helperCard.offsetTop - nY) + "px"
                helperCard.style.left = (helperCard.offsetLeft - nX) + "px"
            }
        }

        function mouseUp(e) {
            document.removeEventListener('mousemove', mouseMove)
        }
        
        if (e.button == 0 || e.button == 1) {
            document.addEventListener('mousemove', mouseMove)
            document.addEventListener('mouseup', mouseUp)
        }
    }
}

const exercises = [
  {
    "name": "Custom",
    "id": "custom",
    "muscleGroup": "custom",
    "exerciseType": "custom"
  },
  {
    "name": "Swimming",
    "id": "swimming",
    "muscleGroup": "chest",
    "equipmentType": "Body Only",
    "exerciseType": "cardio"
  },
  {
    "name": "Drop Push",
    "id": "drop-push",
    "muscleGroup": "chest",
    "equipmentType": "Other",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Incline Push-Up Depth Jump",
    "id": "incline-push-up-depth-jump",
    "muscleGroup": "chest",
    "equipmentType": "Body Only",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Chest Push (multiple Response)",
    "id": "chest-push-multiple-response",
    "muscleGroup": "chest",
    "equipmentType": "Medicine Ball",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Plyo Push-up",
    "id": "plyo-push-up",
    "muscleGroup": "chest",
    "equipmentType": "Body Only",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Isometric Chest Squeezes",
    "id": "isometric-chest-squeezes",
    "muscleGroup": "chest",
    "equipmentType": "Body Only",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Medicine Ball Chest Pass",
    "id": "medicine-ball-chest-pass",
    "muscleGroup": "chest",
    "equipmentType": "Medicine Ball",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Heavy Bag Thrust",
    "id": "heavy-bag-thrust",
    "muscleGroup": "chest",
    "equipmentType": "Other",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Decline Explosive Push-Up",
    "id": "decline-explosive-push-up",
    "muscleGroup": "chest",
    "equipmentType": "Other",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Superman Push-Up",
    "id": "superman-push-up",
    "muscleGroup": "chest",
    "equipmentType": "Body Only",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Clapping Push-Up",
    "id": "clapping-push-up",
    "muscleGroup": "chest",
    "equipmentType": "Body Only",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Chest Push (single Response)",
    "id": "chest-push-single-response",
    "muscleGroup": "chest",
    "equipmentType": "Medicine Ball",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Chest Push With Run Release",
    "id": "chest-push-with-run-release",
    "muscleGroup": "chest",
    "equipmentType": "Medicine Ball",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Chest Push From 3 Point Stance",
    "id": "chest-push-from-3-point-stance",
    "muscleGroup": "chest",
    "equipmentType": "Medicine Ball",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Triple Clap Push-Up",
    "id": "triple-clap-push-up",
    "muscleGroup": "chest",
    "equipmentType": "Body Only",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Bar Push-Up Smith Machine",
    "id": "bar-push-up-smith-machine",
    "muscleGroup": "chest",
    "equipmentType": "Other",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Dumbbell Bench Press",
    "id": "dumbbell-bench-press",
    "muscleGroup": "chest",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Pushups",
    "id": "pushups",
    "muscleGroup": "chest",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Close-grip Bench Press",
    "id": "close-grip-barbell-bench-press",
    "muscleGroup": "chest",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Dumbbell Flyes",
    "id": "dumbbell-flyes",
    "muscleGroup": "chest",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Incline Dumbbell Bench Press",
    "id": "incline-dumbbell-press",
    "muscleGroup": "chest",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Low-cable Cross-over",
    "id": "low-cable-crossover",
    "muscleGroup": "chest",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Barbell Bench Press - Medium Grip",
    "id": "barbell-bench-press-medium-grip",
    "muscleGroup": "chest",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Chest Dip",
    "id": "dips-chest-version",
    "muscleGroup": "chest",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Decline Dumbbell Flyes",
    "id": "decline-dumbbell-flyes",
    "muscleGroup": "chest",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Bodyweight Flyes",
    "id": "bodyweight-flyes",
    "muscleGroup": "chest",
    "equipmentType": "E-Z Curl Bar",
    "exerciseType": "strength"
  },
  {
    "name": "Incline Cable Chest Fly",
    "id": "incline-cable-flye",
    "muscleGroup": "chest",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Decline Barbell Bench Press",
    "id": "decline-barbell-bench-press",
    "muscleGroup": "chest",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Wide-grip Bench Press",
    "id": "wide-grip-barbell-bench-press",
    "muscleGroup": "chest",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Wide-Grip Decline Barbell Bench Press",
    "id": "wide-grip-decline-barbell-bench-press",
    "muscleGroup": "chest",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Reverse-grip Incline Dumbbell Bench Press",
    "id": "incline-dumbbell-press-reverse-grip",
    "muscleGroup": "chest",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Cable Crossover",
    "id": "cable-crossover",
    "muscleGroup": "chest",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Barbell Incline Bench Press Medium-Grip",
    "id": "barbell-incline-bench-press-medium-grip",
    "muscleGroup": "chest",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Incline Dumbbell Flyes",
    "id": "incline-dumbbell-flyes",
    "muscleGroup": "chest",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Close-grip EZ-bar Bench Press",
    "id": "close-grip-ez-bar-press",
    "muscleGroup": "chest",
    "equipmentType": "E-Z Curl Bar",
    "exerciseType": "strength"
  },
  {
    "name": "Incline Push-Up",
    "id": "incline-push-up",
    "muscleGroup": "chest",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Neck Press",
    "id": "neck-press",
    "muscleGroup": "chest",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Incline Cable Chest Press",
    "id": "incline-cable-chest-press",
    "muscleGroup": "chest",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Neutral-grip Dumbbell Bench Press",
    "id": "dumbbell-bench-press-with-neutral-grip",
    "muscleGroup": "chest",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Cable Chest Press",
    "id": "cable-chest-press",
    "muscleGroup": "chest",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Hands-elevated Push-up",
    "id": "incline-push-up-medium",
    "muscleGroup": "chest",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Decline Push-Up",
    "id": "decline-push-up",
    "muscleGroup": "chest",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Single-arm Cable Cross-over",
    "id": "single-arm-cable-crossover",
    "muscleGroup": "chest",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Single-Arm Push-Up",
    "id": "single-arm-push-up",
    "muscleGroup": "chest",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Leverage Incline Chest Press",
    "id": "leverage-incline-chest-press",
    "muscleGroup": "chest",
    "equipmentType": "Machine",
    "exerciseType": "strength"
  },
  {
    "name": "Close Push-up To Wide Push-up",
    "id": "pushups-close-and-wide-hand-positions",
    "muscleGroup": "chest",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Butterfly",
    "id": "butterfly",
    "muscleGroup": "chest",
    "equipmentType": "Machine",
    "exerciseType": "strength"
  },
  {
    "name": "Decline Dumbbell Bench Press",
    "id": "decline-dumbbell-bench-press",
    "muscleGroup": "chest",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Single-arm Kettlebell Row",
    "id": "one-arm-dumbbell-bench-press",
    "muscleGroup": "chest",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Hammer Grip Incline DB Bench Press",
    "id": "hammer-grip-incline-db-bench-press",
    "muscleGroup": "chest",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Wide-grip Hands-elevated Push-up",
    "id": "incline-push-up-wide",
    "muscleGroup": "chest",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Push-Ups With Feet On An Exercise Ball",
    "id": "push-ups-with-feet-on-an-exercise-ball",
    "muscleGroup": "chest",
    "equipmentType": "Exercise Ball",
    "exerciseType": "strength"
  },
  {
    "name": "Feet-elevated Push-up",
    "id": "push-ups-with-feet-elevated",
    "muscleGroup": "chest",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Leverage Chest Press",
    "id": "leverage-chest-press",
    "muscleGroup": "chest",
    "equipmentType": "Machine",
    "exerciseType": "strength"
  },
  {
    "name": "Straight-arm Dumbbell Pull-over",
    "id": "straight-arm-dumbbell-pullover",
    "muscleGroup": "chest",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Decline Smith Press",
    "id": "decline-smith-press",
    "muscleGroup": "chest",
    "equipmentType": "Machine",
    "exerciseType": "strength"
  },
  {
    "name": "Isometric Wipers",
    "id": "isometric-wipers",
    "muscleGroup": "chest",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Cable Cross-over",
    "id": "cable-iron-cross",
    "muscleGroup": "chest",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Incline Dumbbell Bench With Palms Facing In",
    "id": "incline-dumbbell-bench-with-palms-facing-in",
    "muscleGroup": "chest",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Clock Push-up",
    "id": "clock-push-up",
    "muscleGroup": "chest",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Smith Machine Bench Press",
    "id": "smith-machine-bench-press",
    "muscleGroup": "chest",
    "equipmentType": "Machine",
    "exerciseType": "strength"
  },
  {
    "name": "Front Raise And Pullover",
    "id": "front-raise-and-pullover",
    "muscleGroup": "chest",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Leverage Decline Chest Press",
    "id": "leverage-decline-chest-press",
    "muscleGroup": "chest",
    "equipmentType": "Machine",
    "exerciseType": "strength"
  },
  {
    "name": "Push-Up Wide",
    "id": "push-up-wide",
    "muscleGroup": "chest",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Incline Dumbbell Flyes - With A Twist",
    "id": "incline-dumbbell-flyes-with-a-twist",
    "muscleGroup": "chest",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Cross Over - With Bands",
    "id": "cross-over-with-bands",
    "muscleGroup": "chest",
    "equipmentType": "Bands",
    "exerciseType": "strength"
  },
  {
    "name": "Bent-arm Dumbbell Pull-over",
    "id": "bent-arm-dumbbell-pullover",
    "muscleGroup": "chest",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Machine Chest Press",
    "id": "machine-bench-press",
    "muscleGroup": "chest",
    "equipmentType": "Machine",
    "exerciseType": "strength"
  },
  {
    "name": "Standing Cable Chest Press",
    "id": "standing-cable-chest-press",
    "muscleGroup": "chest",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Close-grip Dumbbell Bench Press",
    "id": "close-grip-dumbbell-press",
    "muscleGroup": "chest",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Smith Machine Incline Bench Press",
    "id": "smith-machine-incline-bench-press",
    "muscleGroup": "chest",
    "equipmentType": "Machine",
    "exerciseType": "strength"
  },
  {
    "name": "Sphinx Push-up",
    "id": "body-up",
    "muscleGroup": "chest",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Smith Machine Close-Grip Bench Press",
    "id": "smith-machine-close-grip-bench-press",
    "muscleGroup": "chest",
    "equipmentType": "Machine",
    "exerciseType": "strength"
  },
  {
    "name": "Kettlebell Plyo Push-up",
    "id": "plyo-kettlebell-pushups",
    "muscleGroup": "chest",
    "equipmentType": "Kettlebells",
    "exerciseType": "strength"
  },
  {
    "name": "Close-Hands Push-Up",
    "id": "close-hands-push-up",
    "muscleGroup": "chest",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Around The Worlds",
    "id": "around-the-worlds",
    "muscleGroup": "chest",
    "equipmentType": "Dumbbells",
    "exerciseType": "strength"
  },
  {
    "name": "Tiger-bend Push-up",
    "id": "tiger-bend-push-up",
    "muscleGroup": "chest",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Barbell Bench Press-Wide Grip",
    "id": "barbell-bench-press-wide-grip",
    "muscleGroup": "chest",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Close-grip Hands-elevated Push-up",
    "id": "incline-push-up-close-grip",
    "muscleGroup": "chest",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Lying Cable Chest Fly",
    "id": "flat-bench-cable-flyes",
    "muscleGroup": "chest",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Suspended Push-up",
    "id": "suspended-push-up",
    "muscleGroup": "chest",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Wide-Grip Decline Barbell Pullover",
    "id": "wide-grip-decline-barbell-pullover",
    "muscleGroup": "chest",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Smith Machine Decline Press",
    "id": "smith-machine-decline-press",
    "muscleGroup": "chest",
    "equipmentType": "Machine",
    "exerciseType": "strength"
  },
  {
    "name": "Single-dumbbell Push-up",
    "id": "close-grip-push-up-off-of-a-dumbbell",
    "muscleGroup": "chest",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Push Up To Side Plank",
    "id": "push-up-to-side-plank",
    "muscleGroup": "chest",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Barbell Guillotine Bench Press",
    "id": "barbell-guillotine-bench-press",
    "muscleGroup": "chest",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Side-to-side Push-up",
    "id": "side-to-side-push-up",
    "muscleGroup": "chest",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "One-Arm Flat Bench Dumbbell Flye",
    "id": "one-arm-flat-bench-dumbbell-flye",
    "muscleGroup": "chest",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Extended Range One-Arm Kettlebell Floor Press",
    "id": "extended-range-one-arm-kettlebell-floor-press",
    "muscleGroup": "chest",
    "equipmentType": "Kettlebells",
    "exerciseType": "strength"
  },
  {
    "name": "Kettlebell Alternating Floor Press",
    "id": "alternating-floor-press",
    "muscleGroup": "chest",
    "equipmentType": "Kettlebells",
    "exerciseType": "strength"
  },
  {
    "name": "Bench Press - With Bands",
    "id": "bench-press-with-bands",
    "muscleGroup": "chest",
    "equipmentType": "Bands",
    "exerciseType": "strength"
  },
  {
    "name": "Medicine Ball Sprawl To Chest Press",
    "id": "burpee-to-medicine-ball-press",
    "muscleGroup": "chest",
    "equipmentType": "Medicine Ball",
    "exerciseType": "strength"
  },
  {
    "name": "Weighted Push-Up",
    "id": "weighted-push-up",
    "muscleGroup": "chest",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "One-Arm Kettlebell Floor Press",
    "id": "one-arm-kettlebell-floor-press",
    "muscleGroup": "chest",
    "equipmentType": "Kettlebells",
    "exerciseType": "strength"
  },
  {
    "name": "Typewriter Push-up",
    "id": "typewriter-push-up",
    "muscleGroup": "chest",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Diamond Push-up",
    "id": "diamond-push-up",
    "muscleGroup": "chest",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Leg-Over Floor Press",
    "id": "leg-over-floor-press",
    "muscleGroup": "chest",
    "equipmentType": "Kettlebells",
    "exerciseType": "strength"
  },
  {
    "name": "Judo Push-up",
    "id": "dive-bomber-push-up",
    "muscleGroup": "chest",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Bosu Ball Push-Up",
    "id": "bosu-ball-push-up",
    "muscleGroup": "chest",
    "equipmentType": "Exercise Ball",
    "exerciseType": "strength"
  },
  {
    "name": "Wide Push-up",
    "id": "wide-hands-push-up",
    "muscleGroup": "chest",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Medicine Ball Push-up",
    "id": "medicine-ball-push-up",
    "muscleGroup": "chest",
    "equipmentType": "Medicine Ball",
    "exerciseType": "strength"
  },
  {
    "name": "One-Arm Push-Up",
    "id": "one-arm-push-up",
    "muscleGroup": "chest",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Suspended Chest Fly",
    "id": "suspended-chest-fly",
    "muscleGroup": "chest",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Svend Press",
    "id": "svend-press",
    "muscleGroup": "chest",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Hand Release Push-Up",
    "id": "hand-release-push-up",
    "muscleGroup": "chest",
    "equipmentType": "",
    "exerciseType": "strength"
  },
  {
    "name": "Staggered Push-up",
    "id": "staggered-push-up",
    "muscleGroup": "chest",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Reverse-grip Hands-elevated Push-up",
    "id": "incline-push-up-reverse-grip",
    "muscleGroup": "chest",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Smith Machine Bench Press Throw",
    "id": "bar-throw-and-press",
    "muscleGroup": "chest",
    "equipmentType": "Machine",
    "exerciseType": "strength"
  },
  {
    "name": "Feet-Elevated TRX Push-Up",
    "id": "feet-elevated-trx-push-up",
    "muscleGroup": "chest",
    "equipmentType": "Bands",
    "exerciseType": "strength"
  },
  {
    "name": "Dynamic Chest Stretch",
    "id": "dynamic-chest-stretch",
    "muscleGroup": "chest",
    "equipmentType": "",
    "exerciseType": "stretching"
  },
  {
    "name": "Behind Head Chest Stretch",
    "id": "behind-head-chest-stretch",
    "muscleGroup": "chest",
    "equipmentType": "Other",
    "exerciseType": "stretching"
  },
  {
    "name": "Elbows Back",
    "id": "elbows-back",
    "muscleGroup": "chest",
    "equipmentType": "None",
    "exerciseType": "stretching"
  },
  {
    "name": "Exercise Ball Chest Stretch",
    "id": "chest-stretch-on-stability-ball",
    "muscleGroup": "chest",
    "equipmentType": "Exercise Ball",
    "exerciseType": "stretching"
  },
  {
    "name": "Pass-through Stretch With Band",
    "id": "chest-and-front-of-shoulder-stretch",
    "muscleGroup": "chest",
    "equipmentType": "Other",
    "exerciseType": "stretching"
  },
  {
    "name": "Palms-down Wrist Curl Over Bench",
    "id": "palms-down-wrist-curl-over-a-bench",
    "muscleGroup": "forearms",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Straight-bar Wrist Roll-up",
    "id": "wrist-rotations-with-straight-bar",
    "muscleGroup": "forearms",
    "equipmentType": "",
    "exerciseType": "strength"
  },
  {
    "name": "Palms-up Wrist Curl Over Bench",
    "id": "palms-up-barbell-wrist-curl-over-a-bench",
    "muscleGroup": "forearms",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Standing Behind-the-back Wrist Curl",
    "id": "standing-palms-up-barbell-behind-the-back-wrist-curl",
    "muscleGroup": "forearms",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Seated Finger Curl",
    "id": "finger-curls",
    "muscleGroup": "forearms",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Seated Two-Arm Palms-Up Low-Pulley Wrist Curl",
    "id": "seated-two-arm-palms-up-low-pulley-wrist-curl",
    "muscleGroup": "forearms",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Wrist Roller",
    "id": "wrist-roller",
    "muscleGroup": "forearms",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Seated One-Arm Dumbbell Palms-Up Wrist Curl",
    "id": "seated-one-arm-dumbbell-palms-up-wrist-curl",
    "muscleGroup": "forearms",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Seated Palms-Down Barbell Wrist Curl",
    "id": "seated-palms-down-barbell-wrist-curl",
    "muscleGroup": "forearms",
    "equipmentType": "",
    "exerciseType": "strength"
  },
  {
    "name": "Dumbbell Lying Supination",
    "id": "dumbbell-lying-supination",
    "muscleGroup": "forearms",
    "equipmentType": "",
    "exerciseType": "strength"
  },
  {
    "name": "Dumbbell Lying Pronation",
    "id": "dumbbell-lying-pronation",
    "muscleGroup": "forearms",
    "equipmentType": "",
    "exerciseType": "strength"
  },
  {
    "name": "Seated Palms-up Wrist Curl",
    "id": "seated-palm-up-barbell-wrist-curl",
    "muscleGroup": "forearms",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Palms-Up Dumbbell Wrist Curl Over A Bench",
    "id": "palms-up-dumbbell-wrist-curl-over-a-bench",
    "muscleGroup": "forearms",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Standing Olympic Plate Hand Squeeze",
    "id": "standing-olympic-plate-hand-squeeze",
    "muscleGroup": "forearms",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Seated Palms-down Wrist Curl",
    "id": "seated-dumbbell-palms-down-wrist-curl",
    "muscleGroup": "forearms",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Palms-Down Dumbbell Wrist Curl Over A Bench",
    "id": "palms-down-dumbbell-wrist-curl-over-a-bench",
    "muscleGroup": "forearms",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Seated One-Arm Dumbbell Palms-Down Wrist Curl",
    "id": "seated-one-arm-dumbbell-palms-down-wrist-curl",
    "muscleGroup": "forearms",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Plate Pinch",
    "id": "plate-pinch",
    "muscleGroup": "forearms",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Bottoms-Up Clean From The Hang Position",
    "id": "bottoms-up-clean-from-the-hang-position",
    "muscleGroup": "forearms",
    "equipmentType": "Kettlebells",
    "exerciseType": "strength"
  },
  {
    "name": "Cable Wrist Curl",
    "id": "cable-wrist-curl",
    "muscleGroup": "forearms",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Seated Dumbbell Palms-Up Wrist Curl",
    "id": "seated-dumbbell-palms-up-wrist-curl",
    "muscleGroup": "forearms",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Partner Farmer\u0027s Walk",
    "id": "partner-farmers-walk-competition",
    "muscleGroup": "forearms",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Dumbbell Suitcase Carry",
    "id": "partner-suitcase-carry-competition",
    "muscleGroup": "forearms",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Suitcase Dumbbell Carry",
    "id": "suitcase-dumbbell-carry",
    "muscleGroup": "forearms",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Kneeling Forearm Stretch",
    "id": "kneeling-forearm-stretch",
    "muscleGroup": "forearms",
    "equipmentType": "None",
    "exerciseType": "stretching"
  },
  {
    "name": "Wrist Circles",
    "id": "wrist-circles",
    "muscleGroup": "forearms",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Medicine Ball Slam",
    "id": "overhead-slam",
    "muscleGroup": "lats",
    "equipmentType": "Medicine Ball",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Catch And Overhead Throw",
    "id": "catch-and-overhead-throw",
    "muscleGroup": "lats",
    "equipmentType": "Medicine Ball",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Burpee To Pull-up",
    "id": "burpee-pull-up",
    "muscleGroup": "lats",
    "equipmentType": "Body Only",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Weighted Pull-up",
    "id": "weighted-pull-ups",
    "muscleGroup": "lats",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Pullups",
    "id": "pullups",
    "muscleGroup": "lats",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Rocky Pull-Ups/Pulldowns",
    "id": "rocky-pull-upspulldowns",
    "muscleGroup": "lats",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Close-grip Pull-down",
    "id": "v-bar-pulldown",
    "muscleGroup": "lats",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Pull-up",
    "id": "wide-grip-pull-up",
    "muscleGroup": "lats",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Muscle Up",
    "id": "muscle-up",
    "muscleGroup": "lats",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Shotgun Row",
    "id": "shotgun-row",
    "muscleGroup": "lats",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Close-Grip Front Lat Pulldown",
    "id": "close-grip-front-lat-pulldown",
    "muscleGroup": "lats",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "V-bar Pull-up",
    "id": "v-bar-pullup",
    "muscleGroup": "lats",
    "equipmentType": "",
    "exerciseType": "strength"
  },
  {
    "name": "Rope Climb",
    "id": "rope-climb",
    "muscleGroup": "lats",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Wide-Grip Rear Pull-Up",
    "id": "wide-grip-rear-pull-up",
    "muscleGroup": "lats",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Straight-arm Rope Pull-down",
    "id": "rope-straight-arm-pulldown",
    "muscleGroup": "lats",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Lat Pull-down",
    "id": "wide-grip-lat-pulldown",
    "muscleGroup": "lats",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Reverse-grip Lat Pull-down",
    "id": "underhand-cable-pulldowns",
    "muscleGroup": "lats",
    "equipmentType": "Machine",
    "exerciseType": "strength"
  },
  {
    "name": "Gironda Sternum Chins",
    "id": "gironda-sternum-chins",
    "muscleGroup": "lats",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Side To Side Chins",
    "id": "side-to-side-chins",
    "muscleGroup": "lats",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Machine Seated Row",
    "id": "leverage-iso-row",
    "muscleGroup": "lats",
    "equipmentType": "Machine",
    "exerciseType": "strength"
  },
  {
    "name": "Straight-Arm Pulldown",
    "id": "straight-arm-pulldown",
    "muscleGroup": "lats",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Single-arm Kneeling Lat Pull-down",
    "id": "kneeling-single-arm-high-pulley-row",
    "muscleGroup": "lats",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Elevated Cable Rows",
    "id": "elevated-cable-rows",
    "muscleGroup": "lats",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Neutral-grip Pull-up",
    "id": "neutral-grip-pull-ups",
    "muscleGroup": "lats",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Machine-assisted Pull-up",
    "id": "machine-assisted-pull-up",
    "muscleGroup": "lats",
    "equipmentType": "Machine",
    "exerciseType": "strength"
  },
  {
    "name": "Full Range-Of-Motion Lat Pulldown",
    "id": "full-range-of-motion-lat-pulldown",
    "muscleGroup": "lats",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Bent-arm Barbell Pull-over",
    "id": "bent-arm-barbell-pullover",
    "muscleGroup": "lats",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Kneeling Lat Pull-down",
    "id": "kneeling-high-pulley-row",
    "muscleGroup": "lats",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Band-assisted Pull-up",
    "id": "band-assisted-pull-up",
    "muscleGroup": "lats",
    "equipmentType": "Bands",
    "exerciseType": "strength"
  },
  {
    "name": "Single-arm Pull-down",
    "id": "one-arm-lat-pulldown",
    "muscleGroup": "lats",
    "equipmentType": "Machine",
    "exerciseType": "strength"
  },
  {
    "name": "Cable Incline Pushdown",
    "id": "cable-incline-pushdown",
    "muscleGroup": "lats",
    "equipmentType": "Cable Machine",
    "exerciseType": "strength"
  },
  {
    "name": "Kipping Muscle Up",
    "id": "kipping-muscle-up",
    "muscleGroup": "lats",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Behind-the-neck Pull-down",
    "id": "wide-grip-pulldown-behind-the-neck",
    "muscleGroup": "lats",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Floor Rope Climb",
    "id": "london-bridges",
    "muscleGroup": "lats",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Barbell Pull-over To Press",
    "id": "rockers-pullover-to-press-straight-bar",
    "muscleGroup": "lats",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Around-the-world Pull-up",
    "id": "around-the-world-pull-up",
    "muscleGroup": "lats",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Assisted Chin-Up",
    "id": "assisted-chin-up",
    "muscleGroup": "lats",
    "equipmentType": "Bands",
    "exerciseType": "strength"
  },
  {
    "name": "L-sit Chin-up",
    "id": "l-sit-chin-up",
    "muscleGroup": "lats",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Negative Pull-up",
    "id": "negative-pull-up",
    "muscleGroup": "lats",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "One Arm Against Wall",
    "id": "one-arm-against-wall",
    "muscleGroup": "lats",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Dynamic Back Stretch",
    "id": "dynamic-back-stretch",
    "muscleGroup": "lats",
    "equipmentType": "None",
    "exerciseType": "stretching"
  },
  {
    "name": "Latissimus Dorsi SMR",
    "id": "latissimus-dorsi-smr",
    "muscleGroup": "lats",
    "equipmentType": "Foam Roll",
    "exerciseType": "stretching"
  },
  {
    "name": "One Handed Hang",
    "id": "one-handed-hang",
    "muscleGroup": "lats",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Chair Lower Back Stretch",
    "id": "chair-lower-back-stretch",
    "muscleGroup": "lats",
    "equipmentType": "None",
    "exerciseType": "stretching"
  },
  {
    "name": "Standing Side Bend Stretch",
    "id": "standing-lateral-stretch",
    "muscleGroup": "lats",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Side-Lying Floor Stretch",
    "id": "side-lying-floor-stretch",
    "muscleGroup": "lats",
    "equipmentType": "None",
    "exerciseType": "stretching"
  },
  {
    "name": "Overhead Lat",
    "id": "overhead-lat",
    "muscleGroup": "lats",
    "equipmentType": "Other",
    "exerciseType": "stretching"
  },
  {
    "name": "Rower",
    "id": "rowing-stationary",
    "muscleGroup": "middle-back",
    "equipmentType": "Machine",
    "exerciseType": "cardio"
  },
  {
    "name": "T-Bar Row With Handle",
    "id": "t-bar-row-with-handle",
    "muscleGroup": "middle-back",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Reverse-grip Bent-over Row",
    "id": "reverse-grip-bent-over-rows",
    "muscleGroup": "middle-back",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "One-Arm Dumbbell Row",
    "id": "one-arm-dumbbell-row",
    "muscleGroup": "middle-back",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "One-Arm Long Bar Row",
    "id": "one-arm-long-bar-row",
    "muscleGroup": "middle-back",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "T-Bar Row",
    "id": "t-bar-row",
    "muscleGroup": "middle-back",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Bent Over Two-Arm Long Bar Row",
    "id": "bent-over-two-arm-long-bar-row",
    "muscleGroup": "middle-back",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Alternating Sit-through With Crunch",
    "id": "bent-over-one-arm-long-bar-row",
    "muscleGroup": "middle-back",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Seated Cable Rows",
    "id": "seated-cable-rows",
    "muscleGroup": "middle-back",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Incline Dumbbell Row",
    "id": "dumbbell-incline-row",
    "muscleGroup": "middle-back",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Bent Over Two-Dumbbell Row With Palms In",
    "id": "bent-over-two-dumbbell-row-with-palms-in",
    "muscleGroup": "middle-back",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Upside-down Pull-up",
    "id": "bodyweight-mid-row",
    "muscleGroup": "middle-back",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Bent Over Barbell Row",
    "id": "bent-over-barbell-row",
    "muscleGroup": "middle-back",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Single-arm Cable Seated Row",
    "id": "seated-one-arm-cable-pulley-rows",
    "muscleGroup": "middle-back",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Kettlebell Alternating Renegade Row",
    "id": "alternating-renegade-row",
    "muscleGroup": "middle-back",
    "equipmentType": "Kettlebells",
    "exerciseType": "strength"
  },
  {
    "name": "Man-maker",
    "id": "man-maker",
    "muscleGroup": "middle-back",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Dumbbell Bent-over Row",
    "id": "bent-over-two-dumbbell-row",
    "muscleGroup": "middle-back",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Middle Back Shrug",
    "id": "middle-back-shrug",
    "muscleGroup": "middle-back",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Yates Row Reverse Grip",
    "id": "yates-row-reverse-grip",
    "muscleGroup": "middle-back",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Smith Machine Inverted Row",
    "id": "inverted-row",
    "muscleGroup": "middle-back",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "One-Arm Kettlebell Row",
    "id": "one-arm-kettlebell-row",
    "muscleGroup": "middle-back",
    "equipmentType": "",
    "exerciseType": "strength"
  },
  {
    "name": "Mixed Grip Chin",
    "id": "mixed-grip-chin",
    "muscleGroup": "middle-back",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Pendlay Row",
    "id": "pendlay-row",
    "muscleGroup": "middle-back",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Smith Machine Bent-over Row",
    "id": "smith-machine-bent-over-row",
    "muscleGroup": "middle-back",
    "equipmentType": "Machine",
    "exerciseType": "strength"
  },
  {
    "name": "Alternating Kettlebell Row",
    "id": "alternating-kettlebell-row",
    "muscleGroup": "middle-back",
    "equipmentType": "Kettlebells",
    "exerciseType": "strength"
  },
  {
    "name": "Lying T-Bar Row",
    "id": "lying-t-bar-row",
    "muscleGroup": "middle-back",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Leverage High Row",
    "id": "leverage-high-row",
    "muscleGroup": "middle-back",
    "equipmentType": "Machine",
    "exerciseType": "strength"
  },
  {
    "name": "Suspended Row",
    "id": "suspended-row",
    "muscleGroup": "middle-back",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Incline Bench Pull",
    "id": "incline-bench-pull",
    "muscleGroup": "middle-back",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Two-Arm Kettlebell Row",
    "id": "two-arm-kettlebell-row",
    "muscleGroup": "middle-back",
    "equipmentType": "Kettlebells",
    "exerciseType": "strength"
  },
  {
    "name": "Straight Bar Bench Mid Rows",
    "id": "straight-bar-bench-mid-rows",
    "muscleGroup": "middle-back",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Inverted Row With Straps",
    "id": "inverted-row-with-straps",
    "muscleGroup": "middle-back",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "One Arm Chin-Up",
    "id": "one-arm-chin-up",
    "muscleGroup": "middle-back",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Barbell Seal Row",
    "id": "lying-cambered-barbell-row",
    "muscleGroup": "middle-back",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Partner Facing Feet-Elevated Side Plank With Band Row",
    "id": "partner-facing-feet-elevated-side-plank-with-band-row",
    "muscleGroup": "middle-back",
    "equipmentType": "Bands",
    "exerciseType": "strength"
  },
  {
    "name": "Sled Row",
    "id": "sled-row",
    "muscleGroup": "middle-back",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Yates Row",
    "id": "yates-row",
    "muscleGroup": "middle-back",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Partner Side Plank Band Row",
    "id": "partner-facing-side-plank-with-band-row",
    "muscleGroup": "middle-back",
    "equipmentType": "Bands",
    "exerciseType": "strength"
  },
  {
    "name": "Plate Row",
    "id": "plate-row",
    "muscleGroup": "middle-back",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Barbell Deadlift Bent Row Complex",
    "id": "barbell-deadlift-bent-row-complex",
    "muscleGroup": "middle-back",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Single-Arm Landmine Row",
    "id": "single-arm-landmine-row",
    "muscleGroup": "middle-back",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Rhomboids SMR",
    "id": "rhomboids-smr",
    "muscleGroup": "middle-back",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Spinal Stretch",
    "id": "spinal-stretch",
    "muscleGroup": "middle-back",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Upper Back Stretch",
    "id": "upper-back-stretch",
    "muscleGroup": "middle-back",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Middle Back Stretch",
    "id": "middle-back-stretch",
    "muscleGroup": "middle-back",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Back Extension",
    "id": "hyperextensions-back-extensions",
    "muscleGroup": "lower-back",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Hyperextensions With No Hyperextension Bench",
    "id": "hyperextensions-with-no-hyperextension-bench",
    "muscleGroup": "lower-back",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Exercise Ball Weighted Hyperextension",
    "id": "weighted-ball-hyperextension",
    "muscleGroup": "lower-back",
    "equipmentType": "Exercise Ball",
    "exerciseType": "strength"
  },
  {
    "name": "Seated Back Extension",
    "id": "seated-back-extension",
    "muscleGroup": "lower-back",
    "equipmentType": "Machine",
    "exerciseType": "strength"
  },
  {
    "name": "Stiff Leg Barbell Good Morning",
    "id": "stiff-leg-barbell-good-morning",
    "muscleGroup": "lower-back",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Partner Flat-Bench Back Extension",
    "id": "partner-flat-bench-back-extension",
    "muscleGroup": "lower-back",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Partner Superman With Alternating High-five",
    "id": "partner-supermans-with-alternating-high-five",
    "muscleGroup": "lower-back",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Partner Bench Back Extension",
    "id": "partner-flat-bench-back-extension-with-hold",
    "muscleGroup": "lower-back",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Superman",
    "id": "superman",
    "muscleGroup": "lower-back",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Hug A Ball",
    "id": "hug-a-ball",
    "muscleGroup": "lower-back",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Dancer\u0027s Stretch",
    "id": "dancers-stretch",
    "muscleGroup": "lower-back",
    "equipmentType": "None",
    "exerciseType": "stretching"
  },
  {
    "name": "Child\u0027s Pose",
    "id": "childs-pose",
    "muscleGroup": "lower-back",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Pelvic Tilt Into Bridge",
    "id": "pelvic-tilt-into-bridge",
    "muscleGroup": "lower-back",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Cat Stretch",
    "id": "cat-stretch",
    "muscleGroup": "lower-back",
    "equipmentType": "None",
    "exerciseType": "stretching"
  },
  {
    "name": "Lower Back SMR",
    "id": "lower-back-smr",
    "muscleGroup": "lower-back",
    "equipmentType": "Foam Roll",
    "exerciseType": "stretching"
  },
  {
    "name": "Hug Knees To Chest",
    "id": "hug-knees-to-chest",
    "muscleGroup": "lower-back",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Crossover Reverse Lunge",
    "id": "crossover-reverse-lunge",
    "muscleGroup": "lower-back",
    "equipmentType": "None",
    "exerciseType": "stretching"
  },
  {
    "name": "Standing Pelvic Tilt",
    "id": "standing-pelvic-tilt",
    "muscleGroup": "lower-back",
    "equipmentType": "None",
    "exerciseType": "stretching"
  },
  {
    "name": "Pyramid",
    "id": "pyramid",
    "muscleGroup": "lower-back",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Lying Face Down Plate Neck Resistance",
    "id": "lying-face-down-plate-neck-resistance",
    "muscleGroup": "neck",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Lying Face Up Plate Neck Resistance",
    "id": "lying-face-up-plate-neck-resistance",
    "muscleGroup": "neck",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Seated Head Harness Neck Resistance",
    "id": "seated-head-harness-neck-resistance",
    "muscleGroup": "neck",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Isometric Neck Exercise - Sides",
    "id": "isometric-neck-exercise-sides",
    "muscleGroup": "neck",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Isometric Neck Exercise - Front And Back",
    "id": "isometric-neck-exercise-front-and-back",
    "muscleGroup": "neck",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Neck Bridge Prone",
    "id": "neck-bridge-prone",
    "muscleGroup": "neck",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Side Neck Stretch",
    "id": "side-neck-stretch",
    "muscleGroup": "neck",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Chin To Chest Stretch",
    "id": "chin-to-chest-stretch",
    "muscleGroup": "neck",
    "equipmentType": "",
    "exerciseType": "stretching"
  },
  {
    "name": "Neck-SMR",
    "id": "neck-smr",
    "muscleGroup": "neck",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Jumping Rope",
    "id": "rope-jumping",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "cardio"
  },
  {
    "name": "Stair Climber",
    "id": "step-mill",
    "muscleGroup": "quadriceps",
    "equipmentType": "Machine",
    "exerciseType": "cardio"
  },
  {
    "name": "Bicycling",
    "id": "bicycling",
    "muscleGroup": "quadriceps",
    "equipmentType": "Other",
    "exerciseType": "cardio"
  },
  {
    "name": "Elliptical Trainer",
    "id": "elliptical-trainer",
    "muscleGroup": "quadriceps",
    "equipmentType": "Machine",
    "exerciseType": "cardio"
  },
  {
    "name": "Stairmaster",
    "id": "stairmaster",
    "muscleGroup": "quadriceps",
    "equipmentType": "Machine",
    "exerciseType": "cardio"
  },
  {
    "name": "Burpee",
    "id": "burpee",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "cardio"
  },
  {
    "name": "Trail Running/Walking",
    "id": "trail-runningwalking",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "cardio"
  },
  {
    "name": "Skating",
    "id": "skating",
    "muscleGroup": "quadriceps",
    "equipmentType": "Other",
    "exerciseType": "cardio"
  },
  {
    "name": "Treadmill Running",
    "id": "running-treadmill",
    "muscleGroup": "quadriceps",
    "equipmentType": "Machine",
    "exerciseType": "cardio"
  },
  {
    "name": "Jog In Place",
    "id": "jog-in-place",
    "muscleGroup": "quadriceps",
    "equipmentType": "",
    "exerciseType": "cardio"
  },
  {
    "name": "Stationary Bike",
    "id": "bicycling-stationary",
    "muscleGroup": "quadriceps",
    "equipmentType": "Machine",
    "exerciseType": "cardio"
  },
  {
    "name": "Treadmill Jogging",
    "id": "jogging-treadmill",
    "muscleGroup": "quadriceps",
    "equipmentType": "Machine",
    "exerciseType": "cardio"
  },
  {
    "name": "Butt Kicks",
    "id": "butt-kicks",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Weight",
    "exerciseType": "cardio"
  },
  {
    "name": "Recumbent Bike",
    "id": "recumbent-bike",
    "muscleGroup": "quadriceps",
    "equipmentType": "Machine",
    "exerciseType": "cardio"
  },
  {
    "name": "Treadmill Walking",
    "id": "walking-treadmill",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "cardio"
  },
  {
    "name": "Walking High Knees",
    "id": "walking-high-knees",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "cardio"
  },
  {
    "name": "Lateral Speed Step",
    "id": "lateral-speed-step",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "cardio"
  },
  {
    "name": "Fast Kick With Arm Circles",
    "id": "fast-kick-with-arm-circles",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "cardio"
  },
  {
    "name": "Defensive Slide",
    "id": "defensive-slide",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "cardio"
  },
  {
    "name": "Vertical Mountain Climber",
    "id": "vertical-mountain-climber",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "cardio"
  },
  {
    "name": "Football Up-Down",
    "id": "football-up-down",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "cardio"
  },
  {
    "name": "Slow Jog",
    "id": "slow-jog",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "cardio"
  },
  {
    "name": "High Knees",
    "id": "high-knee-jog",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "cardio"
  },
  {
    "name": "Jumping Jack",
    "id": "jumping-jack",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "cardio"
  },
  {
    "name": "Double Under",
    "id": "double-under",
    "muscleGroup": "quadriceps",
    "equipmentType": "Other",
    "exerciseType": "cardio"
  },
  {
    "name": "Single Leg Push-off",
    "id": "single-leg-push-off",
    "muscleGroup": "quadriceps",
    "equipmentType": "Other",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Side-to-side Box Skip",
    "id": "side-to-side-box-shuffle",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Double Leg Butt Kick",
    "id": "double-leg-butt-kick",
    "muscleGroup": "quadriceps",
    "equipmentType": "",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Broad Jump",
    "id": "standing-long-jump",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Scissors Jump",
    "id": "scissors-jump",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Jumping Jack-",
    "id": "jumping-jacks",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Dumbbell Seated Box Jump",
    "id": "dumbbell-seated-box-jump",
    "muscleGroup": "quadriceps",
    "equipmentType": "Dumbbell",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Alien Squat",
    "id": "alien-squat",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Wall Ball Toss",
    "id": "wall-ball-squat",
    "muscleGroup": "quadriceps",
    "equipmentType": "Exercise Ball",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Rocket Jump",
    "id": "rocket-jump",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Depth Jump Box Jump",
    "id": "depth-jump-leap",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Single Leg Butt Kick",
    "id": "single-leg-butt-kick",
    "muscleGroup": "quadriceps",
    "equipmentType": "",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Jump Squat",
    "id": "jump-squat",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Over Bench Jump",
    "id": "bench-jump",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Split Jump",
    "id": "split-jump",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Front Cone Hops (or Hurdle Hops)",
    "id": "front-cone-hops-or-hurdle-hops",
    "muscleGroup": "quadriceps",
    "equipmentType": "Other",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Bench Skip",
    "id": "bench-sprint",
    "muscleGroup": "quadriceps",
    "equipmentType": "Other",
    "exerciseType": "plyometrics"
  },
  {
    "name": "90-degree Jump Squat",
    "id": "90-degree-jump-squat-twist",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Alternate Leg Diagonal Bound",
    "id": "alternate-leg-diagonal-bound",
    "muscleGroup": "quadriceps",
    "equipmentType": "None",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Skip",
    "id": "fast-skipping",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Burpee Over Barbell",
    "id": "burpee-over-barbell",
    "muscleGroup": "quadriceps",
    "equipmentType": "Other",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Single-Leg Box Jump",
    "id": "single-leg-box-jump",
    "muscleGroup": "quadriceps",
    "equipmentType": "Other",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Southpaw Sprawl",
    "id": "southpaw-sprawl",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Single-Leg Hop Progression",
    "id": "single-leg-hop-progression",
    "muscleGroup": "quadriceps",
    "equipmentType": "Other",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Stride Jump Crossover",
    "id": "stride-jump-crossover",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Feet Jack",
    "id": "feet-jack",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Weight",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Single-cone Sprint Drill",
    "id": "single-cone-sprint-drill",
    "muscleGroup": "quadriceps",
    "equipmentType": "Other",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Single-Leg Stride Jump",
    "id": "single-leg-stride-jump",
    "muscleGroup": "quadriceps",
    "equipmentType": "Other",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Side Standing Long Jump",
    "id": "side-standing-long-jump",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Dumbbell Lateral Hop To Sprint",
    "id": "lateral-hop-4-times-to-sprint",
    "muscleGroup": "quadriceps",
    "equipmentType": "None",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Slide Jump Shot",
    "id": "slide-jump-shot",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Sprawl Frog Kick",
    "id": "sprawl-frog-kick",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Trap Bar Jump",
    "id": "trap-bar-jump",
    "muscleGroup": "quadriceps",
    "equipmentType": "Other",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Side Hop-Sprint",
    "id": "side-hop-sprint",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Single-Leg Lateral Hop",
    "id": "single-leg-lateral-hop",
    "muscleGroup": "quadriceps",
    "equipmentType": "Other",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Pop Squat",
    "id": "pop-squat",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Star Jump",
    "id": "star-jump",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Dumbbell Lateral Hop",
    "id": "lateral-hop-holding-dumbbells",
    "muscleGroup": "quadriceps",
    "equipmentType": "Dumbbell",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Burpee Box-Jumps",
    "id": "burpee-boxjumps",
    "muscleGroup": "quadriceps",
    "equipmentType": "Other",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Quick Leap",
    "id": "quick-leap",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Reverse Burpee",
    "id": "reverse-burpee",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Jump Lunge Heel Kick",
    "id": "lunge-heel-kick",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Burpee Box Jump",
    "id": "burpee-box-jump",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Linear Depth Jump",
    "id": "linear-depth-jump",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Kettlebell Fire Feet",
    "id": "kettlebell-fire-feet",
    "muscleGroup": "quadriceps",
    "equipmentType": "Kettlebells",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Square Hop",
    "id": "square-hop",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Running Lunge",
    "id": "running-lunge",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Dumbbell Jump Squat",
    "id": "dumbbell-jump-squat",
    "muscleGroup": "quadriceps",
    "equipmentType": "Dumbbell",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Medicine Ball Ninja",
    "id": "medicine-ball-ninja",
    "muscleGroup": "quadriceps",
    "equipmentType": "Medicine Ball",
    "exerciseType": "plyometrics"
  },
  {
    "name": "In-out Jump Squat",
    "id": "wide-stance-jump-squat-to-close-stance",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Gorilla Squat",
    "id": "gorilla-squat",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Burpee Tuck Jump",
    "id": "burpee-tuck-jump",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Speed Skater",
    "id": "ice-skater",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Jumping Knee Up-down",
    "id": "jumping-knee-up-down",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Jump Lunge To Feet Jack",
    "id": "jump-lunge-to-feet-jack",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Single-Leg Press",
    "id": "single-leg-press",
    "muscleGroup": "quadriceps",
    "equipmentType": "Machine",
    "exerciseType": "strength"
  },
  {
    "name": "Barbell Full Squat",
    "id": "barbell-full-squat",
    "muscleGroup": "quadriceps",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Barbell Walking Lunge",
    "id": "barbell-walking-lunge",
    "muscleGroup": "quadriceps",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Front Squats With Two Kettlebells",
    "id": "front-squats-with-two-kettlebells",
    "muscleGroup": "quadriceps",
    "equipmentType": "Kettlebells",
    "exerciseType": "strength"
  },
  {
    "name": "Kettlebell Pistol Squat",
    "id": "kettlebell-pistol-squat",
    "muscleGroup": "quadriceps",
    "equipmentType": "Kettlebells",
    "exerciseType": "strength"
  },
  {
    "name": "Forward Lunge",
    "id": "bodyweight-lunge",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Narrow-stance Squat",
    "id": "narrow-stance-squats",
    "muscleGroup": "quadriceps",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Single-leg Depth Squat",
    "id": "single-leg-high-box-squat",
    "muscleGroup": "quadriceps",
    "equipmentType": "Bands",
    "exerciseType": "strength"
  },
  {
    "name": "Weighted Jump Squat",
    "id": "weighted-jump-squat-",
    "muscleGroup": "quadriceps",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Barbell Squat",
    "id": "barbell-squat",
    "muscleGroup": "quadriceps",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Dumbbell Goblet Squat",
    "id": "dumbbell-goblet-squat",
    "muscleGroup": "quadriceps",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Dumbbell Squat",
    "id": "dumbbell-squat",
    "muscleGroup": "quadriceps",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Barbell Front Squat",
    "id": "front-barbell-squat",
    "muscleGroup": "quadriceps",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Leg Press",
    "id": "leg-press",
    "muscleGroup": "quadriceps",
    "equipmentType": "Machine",
    "exerciseType": "strength"
  },
  {
    "name": "Barbell Forward Lunge",
    "id": "barbell-lunge",
    "muscleGroup": "quadriceps",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Dumbbell Lunges",
    "id": "dumbbell-lunges",
    "muscleGroup": "quadriceps",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Bodyweight Squat",
    "id": "bodyweight-squat",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Hex-bar Deadlift",
    "id": "trap-bar-deadlift",
    "muscleGroup": "quadriceps",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Narrow-stance Leg Press",
    "id": "narrow-stance-leg-press",
    "muscleGroup": "quadriceps",
    "equipmentType": "Machine",
    "exerciseType": "strength"
  },
  {
    "name": "Narrow Stance Hack Squats",
    "id": "narrow-stance-hack-squats",
    "muscleGroup": "quadriceps",
    "equipmentType": "Machine",
    "exerciseType": "strength"
  },
  {
    "name": "Smith Machine Box Squat",
    "id": "chair-squat",
    "muscleGroup": "quadriceps",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Machine Squat",
    "id": "machine-squat",
    "muscleGroup": "quadriceps",
    "equipmentType": "Machine",
    "exerciseType": "strength"
  },
  {
    "name": "Dumbbell Reverse Lunge",
    "id": "dumbbell-rear-lunge",
    "muscleGroup": "quadriceps",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Barbell Step-up",
    "id": "barbell-step-ups",
    "muscleGroup": "quadriceps",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Smith Machine Back Squat",
    "id": "smith-machine-squat",
    "muscleGroup": "quadriceps",
    "equipmentType": "Machine",
    "exerciseType": "strength"
  },
  {
    "name": "Goblet Squat",
    "id": "goblet-squat",
    "muscleGroup": "quadriceps",
    "equipmentType": "Kettlebells",
    "exerciseType": "strength"
  },
  {
    "name": "Split Squat With Dumbbells",
    "id": "split-squat-with-dumbbells",
    "muscleGroup": "quadriceps",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Leg Extensions",
    "id": "leg-extensions",
    "muscleGroup": "quadriceps",
    "equipmentType": "Machine",
    "exerciseType": "strength"
  },
  {
    "name": "Barbell Bulgarian Split Squat",
    "id": "one-leg-barbell-squat",
    "muscleGroup": "quadriceps",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Barbell Hack Squat",
    "id": "barbell-hack-squat",
    "muscleGroup": "quadriceps",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Hack Squat",
    "id": "hack-squat",
    "muscleGroup": "quadriceps",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Arms-crossed Jump Squat",
    "id": "freehand-jump-squat",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Weighted Sissy Squat",
    "id": "weighted-sissy-squat",
    "muscleGroup": "quadriceps",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Barbell Thruster",
    "id": "barbell-thruster",
    "muscleGroup": "quadriceps",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Dumbbell Sumo Squat",
    "id": "plie-dumbbell-squat",
    "muscleGroup": "quadriceps",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Bodyweight Reverse Lunge",
    "id": "bodyweight-reverse-lunge",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Dumbbell Step-up",
    "id": "dumbbell-step-ups",
    "muscleGroup": "quadriceps",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Barbell Back Squat",
    "id": "wide-stance-barbell-squat",
    "muscleGroup": "quadriceps",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Cable Hip Adduction",
    "id": "cable-hip-adduction",
    "muscleGroup": "quadriceps",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Zercher Squat",
    "id": "zercher-squats",
    "muscleGroup": "quadriceps",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Smith Machine Leg Press",
    "id": "smith-machine-leg-press",
    "muscleGroup": "quadriceps",
    "equipmentType": "Machine",
    "exerciseType": "strength"
  },
  {
    "name": "Jefferson Squats",
    "id": "jefferson-squats",
    "muscleGroup": "quadriceps",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Bodyweight Walking Lunge",
    "id": "bodyweight-walking-lunge",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Lying Machine Squat",
    "id": "lying-machine-squat",
    "muscleGroup": "quadriceps",
    "equipmentType": "Machine",
    "exerciseType": "strength"
  },
  {
    "name": "Pistol Squat",
    "id": "pistol-squat",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Single-Leg Leg Extension",
    "id": "single-leg-leg-extension",
    "muscleGroup": "quadriceps",
    "equipmentType": "",
    "exerciseType": "strength"
  },
  {
    "name": "Lateral Lunge",
    "id": "side-lunge",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Barbell Side Split Squat",
    "id": "barbell-side-split-squat",
    "muscleGroup": "quadriceps",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Seated Leg Press",
    "id": "seated-leg-press",
    "muscleGroup": "quadriceps",
    "equipmentType": "Machine",
    "exerciseType": "strength"
  },
  {
    "name": "Cable Deadlifts",
    "id": "cable-deadlifts",
    "muscleGroup": "quadriceps",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Kettlebell Curtsy Lunge",
    "id": "kettlebell-curtsy-lunge",
    "muscleGroup": "quadriceps",
    "equipmentType": "Kettlebells",
    "exerciseType": "strength"
  },
  {
    "name": "Smith Machine Bulgarian Split Squat",
    "id": "smith-single-leg-split-squat",
    "muscleGroup": "quadriceps",
    "equipmentType": "Machine",
    "exerciseType": "strength"
  },
  {
    "name": "Barbell Speed Squat",
    "id": "speed-squats",
    "muscleGroup": "quadriceps",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Single-arm Side Deadlift",
    "id": "one-arm-side-deadlift",
    "muscleGroup": "quadriceps",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Barbell Squat To A Bench",
    "id": "barbell-squat-to-a-bench",
    "muscleGroup": "quadriceps",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Dumbbell Walking Lunge",
    "id": "dumbbell-walking-lunge",
    "muscleGroup": "quadriceps",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Weighted Squat",
    "id": "weighted-squat",
    "muscleGroup": "quadriceps",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Smith Machine Pistol Squat",
    "id": "smith-machine-pistol-squat",
    "muscleGroup": "quadriceps",
    "equipmentType": "Machine",
    "exerciseType": "strength"
  },
  {
    "name": "Wide-Stance Leg Press",
    "id": "wide-stance-leg-press",
    "muscleGroup": "quadriceps",
    "equipmentType": "",
    "exerciseType": "strength"
  },
  {
    "name": "Dumbbell Squat To A Bench",
    "id": "dumbbell-squat-to-a-bench",
    "muscleGroup": "quadriceps",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Single-arm Kettlebell Overhead Squat",
    "id": "one-arm-overhead-kettlebell-squats",
    "muscleGroup": "quadriceps",
    "equipmentType": "Kettlebells",
    "exerciseType": "strength"
  },
  {
    "name": "Barbell Squat With Plate Slide",
    "id": "squat-with-plate-movers",
    "muscleGroup": "quadriceps",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Suspended Split Squat",
    "id": "suspended-split-squat",
    "muscleGroup": "quadriceps",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Squats - With Bands",
    "id": "squats-with-bands",
    "muscleGroup": "quadriceps",
    "equipmentType": "Bands",
    "exerciseType": "strength"
  },
  {
    "name": "Front Barbell Squat To A Bench",
    "id": "front-barbell-squat-to-a-bench",
    "muscleGroup": "quadriceps",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Dumbbell Overhead Squat",
    "id": "dumbbell-overhead-squat",
    "muscleGroup": "quadriceps",
    "equipmentType": "Dumbbells",
    "exerciseType": "strength"
  },
  {
    "name": "Front Squat Push Press",
    "id": "front-squat-push-press",
    "muscleGroup": "quadriceps",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Dumbbell Walking Lunge-",
    "id": "walking-lunge-with-overhead-weight",
    "muscleGroup": "quadriceps",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Dumbbell Thruster",
    "id": "dumbbell-squat-to-shoulder-press",
    "muscleGroup": "quadriceps",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Thigh Killa",
    "id": "thigh-killa",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Barbell Reverse Lunge",
    "id": "barbell-reverse-lunge",
    "muscleGroup": "quadriceps",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Kettlebell Side Squat",
    "id": "kettlebell-side-squat",
    "muscleGroup": "quadriceps",
    "equipmentType": "Kettlebells",
    "exerciseType": "strength"
  },
  {
    "name": "Dumbbell Front Squat",
    "id": "dumbbell-front-squat",
    "muscleGroup": "quadriceps",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Close-stance Dumbbell Front Squat",
    "id": "close-stance-dumbbell-front-squat",
    "muscleGroup": "quadriceps",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Front Squat (Clean Grip)",
    "id": "front-squat-clean-grip",
    "muscleGroup": "quadriceps",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Wall Squat",
    "id": "wall-squat",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Hip Flexion With Band",
    "id": "hip-flexion-with-band",
    "muscleGroup": "quadriceps",
    "equipmentType": "Bands",
    "exerciseType": "strength"
  },
  {
    "name": "Barbell Front Squat To Back Squat",
    "id": "front-to-back-squat-with-belt",
    "muscleGroup": "quadriceps",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Squat Jerk",
    "id": "squat-jerk",
    "muscleGroup": "quadriceps",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Barbell Front-To-Back Squat",
    "id": "barbell-front-to-back-squat",
    "muscleGroup": "quadriceps",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Single-Arm Dumbbell Overhead Squat",
    "id": "single-arm-dumbbell-overhead-squat",
    "muscleGroup": "quadriceps",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Forward Band Walk",
    "id": "forward-band-walk",
    "muscleGroup": "quadriceps",
    "equipmentType": "Bands",
    "exerciseType": "strength"
  },
  {
    "name": "Box Squat With Chains",
    "id": "box-squat-with-chains",
    "muscleGroup": "quadriceps",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Kettlebell Sumo Squat",
    "id": "kettlebell-sumo-squat",
    "muscleGroup": "quadriceps",
    "equipmentType": "Kettlebells",
    "exerciseType": "strength"
  },
  {
    "name": "Side Lunge Touching Heel",
    "id": "side-lunge-touching-heel",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Dumbbell Lunge With Biceps Curl",
    "id": "dumbbell-lunge-and-curl",
    "muscleGroup": "quadriceps",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Dumbbell Pistol Squat",
    "id": "dumbbell-pistol-squat",
    "muscleGroup": "quadriceps",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Single-leg Box Squat",
    "id": "single-leg-squat-to-box",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Front Squat (Bodybuilder)",
    "id": "front-squat-bodybuilder",
    "muscleGroup": "quadriceps",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Dumbbell Squat Snatch",
    "id": "dumbbell-squat-snatch",
    "muscleGroup": "quadriceps",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Barbell Step-down Reverse Lunge",
    "id": "elevated-back-lunge",
    "muscleGroup": "quadriceps",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Split Squat With Kettlebells",
    "id": "split-squat-with-kettlebells",
    "muscleGroup": "quadriceps",
    "equipmentType": "",
    "exerciseType": "strength"
  },
  {
    "name": "Kettlebell Thruster Progression",
    "id": "kettlebell-thruster-progression",
    "muscleGroup": "quadriceps",
    "equipmentType": "Kettlebells",
    "exerciseType": "strength"
  },
  {
    "name": "Kettlebell Power Clean",
    "id": "kettlebell-squat-clean",
    "muscleGroup": "quadriceps",
    "equipmentType": "Kettlebells",
    "exerciseType": "strength"
  },
  {
    "name": "Single-leg Knee-tap Squat",
    "id": "single-leg-skater-squat",
    "muscleGroup": "quadriceps",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Dumbbell Alternating Lunge",
    "id": "dumbbell-alternating-lunge",
    "muscleGroup": "quadriceps",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Bosu Ball Squat",
    "id": "bosu-ball-squat",
    "muscleGroup": "quadriceps",
    "equipmentType": "Exercise Ball",
    "exerciseType": "strength"
  },
  {
    "name": "Leverage Deadlift",
    "id": "leverage-deadlift",
    "muscleGroup": "quadriceps",
    "equipmentType": "Machine",
    "exerciseType": "strength"
  },
  {
    "name": "Smith Machine Lunge Sprint",
    "id": "lunge-sprint",
    "muscleGroup": "quadriceps",
    "equipmentType": "None",
    "exerciseType": "strength"
  },
  {
    "name": "Barbell Squat To A Box",
    "id": "barbell-squat-to-a-box",
    "muscleGroup": "quadriceps",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Dumbbell Side Lunge",
    "id": "dumbbell-side-lunge",
    "muscleGroup": "quadriceps",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Single Arm Overhead Kettlebell Squat",
    "id": "single-arm-overhead-kettlebell-squat",
    "muscleGroup": "quadriceps",
    "equipmentType": "Kettlebells",
    "exerciseType": "strength"
  },
  {
    "name": "Intermediate Hip Flexor And Quad Stretch",
    "id": "intermediate-hip-flexor-and-quad-stretch",
    "muscleGroup": "quadriceps",
    "equipmentType": "Other",
    "exerciseType": "stretching"
  },
  {
    "name": "Sit Squats",
    "id": "sit-squats",
    "muscleGroup": "quadriceps",
    "equipmentType": "None",
    "exerciseType": "stretching"
  },
  {
    "name": "Kneeling Hip Flexor Stretch",
    "id": "kneeling-hip-flexor",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Quadriceps SMR",
    "id": "quadriceps-smr",
    "muscleGroup": "quadriceps",
    "equipmentType": "Foam Roll",
    "exerciseType": "stretching"
  },
  {
    "name": "Iron Crosses (stretch)",
    "id": "iron-crosses-stretch",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "All Fours Quad Stretch",
    "id": "all-fours-quad-stretch",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Lying Quad Stretch With Band",
    "id": "quad-stretch",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "One Half Locust",
    "id": "one-half-locust",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Standing Hip Flexors",
    "id": "standing-hip-flexors",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Looking At Ceiling",
    "id": "looking-at-ceiling",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Frog Hops",
    "id": "frog-hops",
    "muscleGroup": "quadriceps",
    "equipmentType": "None",
    "exerciseType": "stretching"
  },
  {
    "name": "Rear Leg Raises",
    "id": "rear-leg-raises",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "On Your Side Quad Stretch",
    "id": "on-your-side-quad-stretch",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "On-Your-Back Quad Stretch",
    "id": "on-your-back-quad-stretch",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Standing Elevated Quad Stretch",
    "id": "standing-elevated-quad-stretch",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Lying Prone Quadriceps",
    "id": "lying-prone-quadriceps",
    "muscleGroup": "quadriceps",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Sled Push-",
    "id": "prowler-sprint",
    "muscleGroup": "hamstrings",
    "equipmentType": "Other",
    "exerciseType": "cardio"
  },
  {
    "name": "Box Jump",
    "id": "front-box-jump",
    "muscleGroup": "hamstrings",
    "equipmentType": "Other",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Linear Acceleration Wall Drill",
    "id": "linear-acceleration-wall-drill",
    "muscleGroup": "hamstrings",
    "equipmentType": "Body Only",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Box Jump (Multiple Response)",
    "id": "box-jump-multiple-response",
    "muscleGroup": "hamstrings",
    "equipmentType": "Other",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Knee Tuck Jump",
    "id": "knee-tuck-jump",
    "muscleGroup": "hamstrings",
    "equipmentType": "Body Only",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Vertical Swing",
    "id": "vertical-swing",
    "muscleGroup": "hamstrings",
    "equipmentType": "Dumbbell",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Moving Claw Series",
    "id": "moving-claw-series-",
    "muscleGroup": "hamstrings",
    "equipmentType": "Body Only",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Box Skip",
    "id": "box-skip",
    "muscleGroup": "hamstrings",
    "equipmentType": "Other",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Hurdle Hops",
    "id": "hurdle-hops",
    "muscleGroup": "hamstrings",
    "equipmentType": "Body Only",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Linear 3-Part Start Technique",
    "id": "linear-3-part-start-technique",
    "muscleGroup": "hamstrings",
    "equipmentType": "Body Only",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Barbell Deadlift",
    "id": "barbell-deadlift",
    "muscleGroup": "hamstrings",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Romanian Deadlift With Dumbbells",
    "id": "romanian-deadlift-with-dumbbells",
    "muscleGroup": "hamstrings",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Natural Glute Ham Raise",
    "id": "natural-glute-ham-raise",
    "muscleGroup": "hamstrings",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Glute Ham Raise-",
    "id": "floor-glute-ham-raise",
    "muscleGroup": "hamstrings",
    "equipmentType": "None",
    "exerciseType": "strength"
  },
  {
    "name": "Lying Leg Curls",
    "id": "lying-leg-curls",
    "muscleGroup": "hamstrings",
    "equipmentType": "Machine",
    "exerciseType": "strength"
  },
  {
    "name": "Stiff-Legged Dumbbell Deadlift",
    "id": "stiff-legged-dumbbell-deadlift",
    "muscleGroup": "hamstrings",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Exercise Ball Leg Curl",
    "id": "ball-leg-curl",
    "muscleGroup": "hamstrings",
    "equipmentType": "Exercise Ball",
    "exerciseType": "strength"
  },
  {
    "name": "Kettlebell Pass-through Lunge",
    "id": "lunge-pass-through",
    "muscleGroup": "hamstrings",
    "equipmentType": "Kettlebells",
    "exerciseType": "strength"
  },
  {
    "name": "Power Clean",
    "id": "power-clean",
    "muscleGroup": "hamstrings",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Kettlebell One-Legged Deadlift",
    "id": "kettlebell-one-legged-deadlift",
    "muscleGroup": "hamstrings",
    "equipmentType": "Kettlebells",
    "exerciseType": "strength"
  },
  {
    "name": "Single-arm Kettlebell Clean",
    "id": "one-arm-kettlebell-clean",
    "muscleGroup": "hamstrings",
    "equipmentType": "Kettlebells",
    "exerciseType": "strength"
  },
  {
    "name": "Barbell Stiff-legged Deadlift",
    "id": "stiff-legged-barbell-deadlift",
    "muscleGroup": "hamstrings",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Single-leg Kettlebell Deadlift",
    "id": "single-leg-deadlift",
    "muscleGroup": "hamstrings",
    "equipmentType": "Kettlebells",
    "exerciseType": "strength"
  },
  {
    "name": "Dumbbell Clean",
    "id": "dumbbell-clean",
    "muscleGroup": "hamstrings",
    "equipmentType": "",
    "exerciseType": "strength"
  },
  {
    "name": "Romanian Deadlift",
    "id": "romanian-deadlift",
    "muscleGroup": "hamstrings",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Romanian Deadlift With Kettlebell",
    "id": "romanian-deadlift-with-kettlebell",
    "muscleGroup": "hamstrings",
    "equipmentType": "Kettlebells",
    "exerciseType": "strength"
  },
  {
    "name": "Reverse Hyperextension",
    "id": "reverse-hyperextension",
    "muscleGroup": "hamstrings",
    "equipmentType": "Machine",
    "exerciseType": "strength"
  },
  {
    "name": "Seated Leg Curl",
    "id": "seated-leg-curl",
    "muscleGroup": "hamstrings",
    "equipmentType": "Machine",
    "exerciseType": "strength"
  },
  {
    "name": "Single-arm Kettlebell Swing",
    "id": "one-arm-kettlebell-swings",
    "muscleGroup": "hamstrings",
    "equipmentType": "Kettlebells",
    "exerciseType": "strength"
  },
  {
    "name": "Standing Leg Curl",
    "id": "standing-leg-curl",
    "muscleGroup": "hamstrings",
    "equipmentType": "Machine",
    "exerciseType": "strength"
  },
  {
    "name": "Smith Machine Stiff-legged Deadlift",
    "id": "smith-machine-stiff-legged-deadlift",
    "muscleGroup": "hamstrings",
    "equipmentType": "Machine",
    "exerciseType": "strength"
  },
  {
    "name": "Smith Machine Hang Power Clean",
    "id": "smith-machine-hang-power-clean",
    "muscleGroup": "hamstrings",
    "equipmentType": "",
    "exerciseType": "strength"
  },
  {
    "name": "Kettlebell Dead Clean",
    "id": "kettlebell-dead-clean",
    "muscleGroup": "hamstrings",
    "equipmentType": "Kettlebells",
    "exerciseType": "strength"
  },
  {
    "name": "Alternating Hang Clean",
    "id": "alternating-hang-clean",
    "muscleGroup": "hamstrings",
    "equipmentType": "Kettlebells",
    "exerciseType": "strength"
  },
  {
    "name": "Prone Manual Hamstring",
    "id": "prone-manual-hamstring",
    "muscleGroup": "hamstrings",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Suspended Leg Curl",
    "id": "suspended-leg-curl",
    "muscleGroup": "hamstrings",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "One-Arm Open Palm Kettlebell Clean",
    "id": "one-arm-open-palm-kettlebell-clean-",
    "muscleGroup": "hamstrings",
    "equipmentType": "Kettlebells",
    "exerciseType": "strength"
  },
  {
    "name": "Stiff-Legged Deadlift",
    "id": "stiff-legged-deadlift",
    "muscleGroup": "hamstrings",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Open Palm Kettlebell Clean",
    "id": "open-palm-kettlebell-clean-",
    "muscleGroup": "hamstrings",
    "equipmentType": "Kettlebells",
    "exerciseType": "strength"
  },
  {
    "name": "Snatch Pull",
    "id": "snatch-pull",
    "muscleGroup": "hamstrings",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Kettlebell Hang Clean",
    "id": "kettlebell-hang-clean",
    "muscleGroup": "hamstrings",
    "equipmentType": "Kettlebells",
    "exerciseType": "strength"
  },
  {
    "name": "Double Kettlebell Alternating Hang Clean",
    "id": "double-kettlebell-alternating-hang-clean",
    "muscleGroup": "hamstrings",
    "equipmentType": "Kettlebells",
    "exerciseType": "strength"
  },
  {
    "name": "Hamstring Slide",
    "id": "platform-hamstring-slides",
    "muscleGroup": "hamstrings",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Seated Band Hamstring Curl",
    "id": "seated-band-hamstring-curl",
    "muscleGroup": "hamstrings",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Standing Leg Swing",
    "id": "front-leg-raises",
    "muscleGroup": "hamstrings",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Leg-Up Hamstring Stretch",
    "id": "leg-up-hamstring-stretch",
    "muscleGroup": "hamstrings",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Inchworm",
    "id": "inchworm",
    "muscleGroup": "hamstrings",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Standing Toe Touches",
    "id": "standing-toe-touches",
    "muscleGroup": "hamstrings",
    "equipmentType": "",
    "exerciseType": "stretching"
  },
  {
    "name": "Lying Groin Stretch With Band",
    "id": "intermediate-groin-stretch",
    "muscleGroup": "hamstrings",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Standing Hamstring And Calf Stretch",
    "id": "standing-hamstring-and-calf-stretch",
    "muscleGroup": "hamstrings",
    "equipmentType": "Bands",
    "exerciseType": "stretching"
  },
  {
    "name": "Lying Hamstring",
    "id": "lying-hamstring",
    "muscleGroup": "hamstrings",
    "equipmentType": "Other",
    "exerciseType": "stretching"
  },
  {
    "name": "Lying Hamstring Stretch With Band",
    "id": "hamstring-stretch",
    "muscleGroup": "hamstrings",
    "equipmentType": "None",
    "exerciseType": "stretching"
  },
  {
    "name": "Hamstring-SMR",
    "id": "hamstring-smr",
    "muscleGroup": "hamstrings",
    "equipmentType": "Foam Roll",
    "exerciseType": "stretching"
  },
  {
    "name": "Upper Back-Leg Grab",
    "id": "upper-back-leg-grab",
    "muscleGroup": "hamstrings",
    "equipmentType": "None",
    "exerciseType": "stretching"
  },
  {
    "name": "Seated Hamstring",
    "id": "seated-hamstring",
    "muscleGroup": "hamstrings",
    "equipmentType": "None",
    "exerciseType": "stretching"
  },
  {
    "name": "Seated Floor Hamstring Stretch",
    "id": "seated-floor-hamstring-stretch",
    "muscleGroup": "hamstrings",
    "equipmentType": "Mat",
    "exerciseType": "stretching"
  },
  {
    "name": "90/90 Hamstring",
    "id": "9090-hamstring",
    "muscleGroup": "hamstrings",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "World\u0027s Greatest Stretch",
    "id": "worlds-greatest-stretch",
    "muscleGroup": "hamstrings",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "The Straddle",
    "id": "the-straddle",
    "muscleGroup": "hamstrings",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Alternating Lunge Jump",
    "id": "split-squats",
    "muscleGroup": "hamstrings",
    "equipmentType": "None",
    "exerciseType": "stretching"
  },
  {
    "name": "Runner\u0027s Stretch",
    "id": "runners-stretch",
    "muscleGroup": "hamstrings",
    "equipmentType": "None",
    "exerciseType": "stretching"
  },
  {
    "name": "Chair Leg Extended Stretch",
    "id": "chair-leg-extended-stretch",
    "muscleGroup": "hamstrings",
    "equipmentType": "Other",
    "exerciseType": "stretching"
  },
  {
    "name": "Knee To Chest",
    "id": "knee-to-chest",
    "muscleGroup": "hamstrings",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Seated Hamstring And Calf Stretch",
    "id": "seated-hamstring-and-calf-stretch",
    "muscleGroup": "hamstrings",
    "equipmentType": "Other",
    "exerciseType": "stretching"
  },
  {
    "name": "Hip Stretch With Twist",
    "id": "hip-stretch-with-twist",
    "muscleGroup": "hamstrings",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Alternating Leg Swing",
    "id": "alternating-leg-swing",
    "muscleGroup": "hamstrings",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Single-leg Balance And Reach",
    "id": "single-leg-balance-",
    "muscleGroup": "hamstrings",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "High Kick",
    "id": "high-kick",
    "muscleGroup": "hamstrings",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Smith Machine Calf Raise",
    "id": "smith-machine-calf-raise",
    "muscleGroup": "calves",
    "equipmentType": "Machine",
    "exerciseType": "strength"
  },
  {
    "name": "Standing Calf Raises",
    "id": "standing-calf-raises",
    "muscleGroup": "calves",
    "equipmentType": "Machine",
    "exerciseType": "strength"
  },
  {
    "name": "Seated Calf Raise",
    "id": "seated-calf-raise",
    "muscleGroup": "calves",
    "equipmentType": "Machine",
    "exerciseType": "strength"
  },
  {
    "name": "Calf Press On The Leg Press Machine",
    "id": "calf-press-on-the-leg-press-machine",
    "muscleGroup": "calves",
    "equipmentType": "Machine",
    "exerciseType": "strength"
  },
  {
    "name": "Rocking Standing Calf Raise",
    "id": "rocking-standing-calf-raise",
    "muscleGroup": "calves",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Calf Press",
    "id": "calf-press",
    "muscleGroup": "calves",
    "equipmentType": "Machine",
    "exerciseType": "strength"
  },
  {
    "name": "Standing Barbell Calf Raise",
    "id": "standing-barbell-calf-raise",
    "muscleGroup": "calves",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Barbell Seated Calf Raise",
    "id": "barbell-seated-calf-raise",
    "muscleGroup": "calves",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Balance Board",
    "id": "balance-board",
    "muscleGroup": "calves",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Weighted Donkey Calf Raise",
    "id": "donkey-calf-raises",
    "muscleGroup": "calves",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Smith Machine Reverse Calf Raises",
    "id": "smith-machine-reverse-calf-raises",
    "muscleGroup": "calves",
    "equipmentType": "Machine",
    "exerciseType": "strength"
  },
  {
    "name": "Dumbbell Seated One-Leg Calf Raise",
    "id": "dumbbell-seated-one-leg-calf-raise",
    "muscleGroup": "calves",
    "equipmentType": "",
    "exerciseType": "strength"
  },
  {
    "name": "Calf Raises - With Bands",
    "id": "calf-raises-with-bands",
    "muscleGroup": "calves",
    "equipmentType": "Bands",
    "exerciseType": "strength"
  },
  {
    "name": "Calf Raise On A Dumbbell",
    "id": "calf-raise-on-a-dumbbell",
    "muscleGroup": "calves",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Ankle Circles",
    "id": "ankle-circles",
    "muscleGroup": "calves",
    "equipmentType": "None",
    "exerciseType": "stretching"
  },
  {
    "name": "Peroneals-SMR",
    "id": "peroneals-smr",
    "muscleGroup": "calves",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Knee Circles",
    "id": "knee-circles",
    "muscleGroup": "calves",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Calf SMR",
    "id": "calves-smr",
    "muscleGroup": "calves",
    "equipmentType": "Foam Roll",
    "exerciseType": "stretching"
  },
  {
    "name": "Standing Gastrocnemius Calf Stretch",
    "id": "standing-gastrocnemius-calf-stretch",
    "muscleGroup": "calves",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Wall Calf Stretch",
    "id": "calf-stretch-hands-against-wall",
    "muscleGroup": "calves",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Anterior Tibialis-SMR",
    "id": "anterior-tibialis-smr",
    "muscleGroup": "calves",
    "equipmentType": "Other",
    "exerciseType": "stretching"
  },
  {
    "name": "Calf Stretch Elbows Against Wall",
    "id": "calf-stretch-elbows-against-wall",
    "muscleGroup": "calves",
    "equipmentType": "None",
    "exerciseType": "stretching"
  },
  {
    "name": "Standing Soleus And Achilles Stretch",
    "id": "standing-soleus-and-achilles-stretch",
    "muscleGroup": "calves",
    "equipmentType": "None",
    "exerciseType": "stretching"
  },
  {
    "name": "Seated Calf Stretch",
    "id": "seated-calf-stretch",
    "muscleGroup": "calves",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Peroneals Stretch",
    "id": "peroneals-stretch",
    "muscleGroup": "calves",
    "equipmentType": "Bands",
    "exerciseType": "stretching"
  },
  {
    "name": "Foot-SMR",
    "id": "foot-smr",
    "muscleGroup": "calves",
    "equipmentType": "Other",
    "exerciseType": "stretching"
  },
  {
    "name": "Posterior Tibialis Stretch",
    "id": "posterior-tibialis-stretch",
    "muscleGroup": "calves",
    "equipmentType": "Bands",
    "exerciseType": "stretching"
  },
  {
    "name": "Supine Chest Throw",
    "id": "supine-chest-throw",
    "muscleGroup": "triceps",
    "equipmentType": "Medicine Ball",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Triceps Dip",
    "id": "dips-triceps-version",
    "muscleGroup": "triceps",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Decline EZ-bar Skullcrusher",
    "id": "decline-ez-bar-triceps-extension",
    "muscleGroup": "triceps",
    "equipmentType": "E-Z Curl Bar",
    "exerciseType": "strength"
  },
  {
    "name": "Cable V-bar Push-down",
    "id": "triceps-pushdown-v-bar-attachment",
    "muscleGroup": "triceps",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Weighted Bench Dip",
    "id": "weighted-bench-dip",
    "muscleGroup": "triceps",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "EZ-Bar Skullcrusher",
    "id": "ez-bar-skullcrusher",
    "muscleGroup": "triceps",
    "equipmentType": "E-Z Curl Bar",
    "exerciseType": "strength"
  },
  {
    "name": "Reverse Grip Triceps Pushdown",
    "id": "reverse-grip-triceps-pushdown",
    "muscleGroup": "triceps",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Push-Ups - Close Triceps Position",
    "id": "push-ups-close-triceps-position",
    "muscleGroup": "triceps",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Kneeling Cable Triceps Extension",
    "id": "kneeling-cable-triceps-extension",
    "muscleGroup": "triceps",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Single-arm Cable Triceps Extension",
    "id": "cable-one-arm-tricep-extension",
    "muscleGroup": "triceps",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Triceps Pushdown - Rope Attachment",
    "id": "triceps-pushdown-rope-attachment",
    "muscleGroup": "triceps",
    "equipmentType": "Cables",
    "exerciseType": "strength"
  },
  {
    "name": "Seated Triceps Press",
    "id": "seated-triceps-press",
    "muscleGroup": "triceps",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Incline EZ-bar Skullcrusher",
    "id": "incline-barbell-triceps-extension",
    "muscleGroup": "triceps",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Decline Close-Grip Bench To Skull Crusher",
    "id": "decline-close-grip-bench-to-skull-crusher",
    "muscleGroup": "triceps",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Tricep Dumbbell Kickback",
    "id": "tricep-dumbbell-kickback",
    "muscleGroup": "triceps",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Dip Machine",
    "id": "dip-machine",
    "muscleGroup": "triceps",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Standing Dumbbell Triceps Extension",
    "id": "standing-dumbbell-triceps-extension",
    "muscleGroup": "triceps",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Parallel Bar Dip",
    "id": "parallel-bar-dip",
    "muscleGroup": "triceps",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Ring Dip",
    "id": "ring-dips",
    "muscleGroup": "triceps",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Double-arm Triceps Kick-back",
    "id": "standing-bent-over-two-arm-dumbbell-triceps-extension",
    "muscleGroup": "triceps",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Feet-elevated Bench Dip",
    "id": "bench-dips",
    "muscleGroup": "triceps",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Behind-the-head Skullcrusher",
    "id": "lying-close-grip-barbell-triceps-extension-behind-the-head",
    "muscleGroup": "triceps",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Triceps Pushdown",
    "id": "triceps-pushdown",
    "muscleGroup": "triceps",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Low Cable Overhead Triceps Extension",
    "id": "triceps-overhead-extension-with-rope",
    "muscleGroup": "triceps",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Standing Barbell Overhead Triceps Extension",
    "id": "standing-overhead-barbell-triceps-extension",
    "muscleGroup": "triceps",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Lying Cable Triceps Extension",
    "id": "cable-lying-triceps-extension",
    "muscleGroup": "triceps",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Single-arm Dumbbell Triceps Extension",
    "id": "dumbbell-one-arm-triceps-extension",
    "muscleGroup": "triceps",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Decline Dumbbell Triceps Extension",
    "id": "decline-dumbbell-triceps-extension",
    "muscleGroup": "triceps",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Dumbbell Skullcrusher",
    "id": "lying-dumbbell-tricep-extension",
    "muscleGroup": "triceps",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Band Skull Crusher",
    "id": "band-skull-crusher",
    "muscleGroup": "triceps",
    "equipmentType": "",
    "exerciseType": "strength"
  },
  {
    "name": "One Arm Pronated Dumbbell Triceps Extension",
    "id": "one-arm-pronated-dumbbell-triceps-extension",
    "muscleGroup": "triceps",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "One Arm Supinated Dumbbell Triceps Extension",
    "id": "one-arm-supinated-dumbbell-triceps-extension",
    "muscleGroup": "triceps",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Standing One-Arm Dumbbell Triceps Extension",
    "id": "standing-one-arm-dumbbell-triceps-extension",
    "muscleGroup": "triceps",
    "equipmentType": "Dumbbells",
    "exerciseType": "strength"
  },
  {
    "name": "Reverse-grip Bench Press",
    "id": "reverse-triceps-bench-press",
    "muscleGroup": "triceps",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Cobra Triceps Extension",
    "id": "cobra-triceps-extension",
    "muscleGroup": "triceps",
    "equipmentType": "",
    "exerciseType": "strength"
  },
  {
    "name": "Bodyweight Triceps Press",
    "id": "body-tricep-press",
    "muscleGroup": "triceps",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Low Cable Triceps Extension",
    "id": "low-cable-triceps-extension",
    "muscleGroup": "triceps",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Seated Bent-Over Two-Arm Dumbbell Triceps Extension",
    "id": "seated-bent-over-two-arm-dumbbell-triceps-extension",
    "muscleGroup": "triceps",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Cable Overhead Triceps Extension",
    "id": "cable-rope-overhead-triceps-extension",
    "muscleGroup": "triceps",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "EZ-bar Skullcrusher-",
    "id": "lying-triceps-press",
    "muscleGroup": "triceps",
    "equipmentType": "E-Z Curl Bar",
    "exerciseType": "strength"
  },
  {
    "name": "Lying Close-Grip Barbell Triceps Press To Chin",
    "id": "lying-close-grip-barbell-triceps-press-to-chin",
    "muscleGroup": "triceps",
    "equipmentType": "E-Z Curl Bar",
    "exerciseType": "strength"
  },
  {
    "name": "Tate Press",
    "id": "tate-press",
    "muscleGroup": "triceps",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Single-arm Low Cable Triceps Extension",
    "id": "standing-low-pulley-one-arm-triceps-extension",
    "muscleGroup": "triceps",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Standing Bent-Over One-Arm Dumbbell Triceps Extension",
    "id": "standing-bent-over-one-arm-dumbbell-triceps-extension",
    "muscleGroup": "triceps",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Seated Bent-Over One-Arm Dumbbell Triceps Extension",
    "id": "seated-bent-over-one-arm-dumbbell-triceps-extension",
    "muscleGroup": "triceps",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Machine Triceps Extension",
    "id": "machine-triceps-extension",
    "muscleGroup": "triceps",
    "equipmentType": "Machine",
    "exerciseType": "strength"
  },
  {
    "name": "One Arm Floor Press",
    "id": "one-arm-floor-press",
    "muscleGroup": "triceps",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Incline Cable Straight-bar Triceps Extension",
    "id": "cable-incline-triceps-extension",
    "muscleGroup": "triceps",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Standing Towel Triceps Extension",
    "id": "standing-towel-triceps-extension",
    "muscleGroup": "triceps",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Dumbbell Tricep Extension -Pronated Grip",
    "id": "dumbbell-tricep-extension-pronated-grip",
    "muscleGroup": "triceps",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "JM Press With Bands",
    "id": "jm-press-with-bands",
    "muscleGroup": "triceps",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "V-sit With Overhead Triceps Extension",
    "id": "v-sit-dumbbell-triceps-extension",
    "muscleGroup": "triceps",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "JM Press",
    "id": "jm-press",
    "muscleGroup": "triceps",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Sled Overhead Triceps Extension",
    "id": "sled-overhead-triceps-extension",
    "muscleGroup": "triceps",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Russian Bar Dip",
    "id": "russian-bar-dip",
    "muscleGroup": "triceps",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Body Triceps Press Using Flat Bench",
    "id": "body-triceps-press-using-flat-bench",
    "muscleGroup": "triceps",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Suspended Triceps Press",
    "id": "suspended-triceps-press",
    "muscleGroup": "triceps",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Band Overhead Triceps Press",
    "id": "speed-band-overhead-triceps",
    "muscleGroup": "triceps",
    "equipmentType": "Bands",
    "exerciseType": "strength"
  },
  {
    "name": "Straight-arm Plank With Kick-back",
    "id": "triceps-plank-extension",
    "muscleGroup": "triceps",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Tricep Side Stretch",
    "id": "tricep-side-stretch",
    "muscleGroup": "triceps",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Triceps Stretch",
    "id": "triceps-stretch",
    "muscleGroup": "triceps",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Overhead Triceps",
    "id": "overhead-triceps",
    "muscleGroup": "triceps",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Smith Machine Shrug",
    "id": "smith-machine-shrug",
    "muscleGroup": "traps",
    "equipmentType": "Machine",
    "exerciseType": "strength"
  },
  {
    "name": "Leverage Shrug",
    "id": "leverage-shrug",
    "muscleGroup": "traps",
    "equipmentType": "Machine",
    "exerciseType": "strength"
  },
  {
    "name": "Standing Dumbbell Shrug",
    "id": "dumbbell-shrug",
    "muscleGroup": "traps",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Standing Dumbbell Upright Row",
    "id": "standing-dumbbell-upright-row",
    "muscleGroup": "traps",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Kettlebell Sumo Deadlift High Pull",
    "id": "kettlebell-sumo-high-pull",
    "muscleGroup": "traps",
    "equipmentType": "Kettlebells",
    "exerciseType": "strength"
  },
  {
    "name": "Calf-Machine Shoulder Shrug",
    "id": "calf-machine-shoulder-shrug",
    "muscleGroup": "traps",
    "equipmentType": "Machine",
    "exerciseType": "strength"
  },
  {
    "name": "Barbell Shrug",
    "id": "barbell-shrug",
    "muscleGroup": "traps",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Barbell Behind-the-back Shrug",
    "id": "barbell-shrug-behind-the-back",
    "muscleGroup": "traps",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Cable Straight-bar Upright Row",
    "id": "upright-cable-row",
    "muscleGroup": "traps",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Cable Shrug",
    "id": "cable-shrugs",
    "muscleGroup": "traps",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Smith Machine Behind-the-back Shrug",
    "id": "smith-machine-behind-the-back-shrug",
    "muscleGroup": "traps",
    "equipmentType": "Machine",
    "exerciseType": "strength"
  },
  {
    "name": "Upright Row - With Bands",
    "id": "upright-row-with-bands",
    "muscleGroup": "traps",
    "equipmentType": "Bands",
    "exerciseType": "strength"
  },
  {
    "name": "Smith Machine Upright Row",
    "id": "smith-machine-upright-row",
    "muscleGroup": "traps",
    "equipmentType": "Machine",
    "exerciseType": "strength"
  },
  {
    "name": "Scapular Pull-Up",
    "id": "scapular-pull-up",
    "muscleGroup": "traps",
    "equipmentType": "None",
    "exerciseType": "strength"
  },
  {
    "name": "Shadow Boxing",
    "id": "punches",
    "muscleGroup": "shoulders",
    "equipmentType": "Body Only",
    "exerciseType": "cardio"
  },
  {
    "name": "Bear Crawl Fire Feet",
    "id": "bear-crawl-fire-feet",
    "muscleGroup": "shoulders",
    "equipmentType": "Body Only",
    "exerciseType": "cardio"
  },
  {
    "name": "Backward Medicine Ball Throw",
    "id": "backward-medicine-ball-throw",
    "muscleGroup": "shoulders",
    "equipmentType": "Medicine Ball",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Kneeling Arm Drill",
    "id": "kneeling-arm-drill-",
    "muscleGroup": "shoulders",
    "equipmentType": "None",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Medicine Ball Scoop Throw",
    "id": "medicine-ball-scoop-throw",
    "muscleGroup": "shoulders",
    "equipmentType": "Medicine Ball",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Return Push From Stance",
    "id": "return-push-from-stance",
    "muscleGroup": "shoulders",
    "equipmentType": "Body Only",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Standing Two-Arm Overhead Throw",
    "id": "standing-two-arm-overhead-throw",
    "muscleGroup": "shoulders",
    "equipmentType": "Medicine Ball",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Wall Sprawl",
    "id": "wall-sprawl",
    "muscleGroup": "shoulders",
    "equipmentType": "Body Only",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Dumbbell Front Raise To Lateral Raise",
    "id": "side-laterals-to-front-raise-",
    "muscleGroup": "shoulders",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Clean And Press",
    "id": "clean-and-press",
    "muscleGroup": "shoulders",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Single-arm Palm-in Dumbbell Shoulder Press",
    "id": "standing-palm-in-one-arm-dumbbell-press",
    "muscleGroup": "shoulders",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Single-arm Kettlebell Push-press",
    "id": "one-arm-kettlebell-push-press",
    "muscleGroup": "shoulders",
    "equipmentType": "Kettlebells",
    "exerciseType": "strength"
  },
  {
    "name": "Military Press",
    "id": "standing-military-press",
    "muscleGroup": "shoulders",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Standing Palms-in Shoulder Press",
    "id": "standing-palms-in-dumbbell-press",
    "muscleGroup": "shoulders",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Seated Barbell Shoulder Press",
    "id": "seated-barbell-military-press",
    "muscleGroup": "shoulders",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Seated Dumbbell Press",
    "id": "seated-dumbbell-press",
    "muscleGroup": "shoulders",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Standing Dumbbell Shoulder Press",
    "id": "standing-dumbbell-press",
    "muscleGroup": "shoulders",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Single-arm Lateral Raise",
    "id": "one-arm-side-laterals",
    "muscleGroup": "shoulders",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Power Partials",
    "id": "power-partials",
    "muscleGroup": "shoulders",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Incline Dumbbell Reverse Fly",
    "id": "reverse-flyes",
    "muscleGroup": "shoulders",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Overhead Dumbbell Front Raise",
    "id": "standing-dumbbell-straight-arm-front-delt-raise-above-head",
    "muscleGroup": "shoulders",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Seated Dumbbell Shoulder Press",
    "id": "dumbbell-shoulder-press",
    "muscleGroup": "shoulders",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Alternating Standing Shoulder Press",
    "id": "standing-alternating-dumbbell-press",
    "muscleGroup": "shoulders",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Single-arm Incline Rear Delt Raise",
    "id": "dumbbell-lying-one-arm-rear-lateral-raise",
    "muscleGroup": "shoulders",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Alternating Dumbbell Front Raise",
    "id": "front-dumbbell-raise",
    "muscleGroup": "shoulders",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Snatch-Grip Behind-The-Neck Overhead Press",
    "id": "snatch-grip-behind-the-neck-overhead-press",
    "muscleGroup": "shoulders",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Car Driver",
    "id": "car-drivers",
    "muscleGroup": "shoulders",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Alternating Deltoid Raise",
    "id": "alternating-deltoid-raise",
    "muscleGroup": "shoulders",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Single-dumbbell Front Raise",
    "id": "single-dumbbell-raise",
    "muscleGroup": "shoulders",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Arnold Press",
    "id": "arnold-dumbbell-press",
    "muscleGroup": "shoulders",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Smith Machine Shoulder Press",
    "id": "smith-machine-overhead-shoulder-press",
    "muscleGroup": "shoulders",
    "equipmentType": "Machine",
    "exerciseType": "strength"
  },
  {
    "name": "Machine Shoulder Press",
    "id": "leverage-shoulder-press",
    "muscleGroup": "shoulders",
    "equipmentType": "Machine",
    "exerciseType": "strength"
  },
  {
    "name": "Front Plate Raise",
    "id": "front-plate-raise",
    "muscleGroup": "shoulders",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Single-arm Standing Shoulder Press",
    "id": "dumbbell-one-arm-shoulder-press",
    "muscleGroup": "shoulders",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Dumbbell Front Raise",
    "id": "front-two-dumbbell-raise",
    "muscleGroup": "shoulders",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Bent-over Dumbbell Rear Delt Row",
    "id": "dumbbell-rear-delt-row",
    "muscleGroup": "shoulders",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "External Rotation With Cable",
    "id": "external-rotation-with-cable",
    "muscleGroup": "shoulders",
    "equipmentType": "Cables",
    "exerciseType": "strength"
  },
  {
    "name": "Handstand Push-up",
    "id": "handstand-push-ups",
    "muscleGroup": "shoulders",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Incline Dumbbell Front Raise",
    "id": "front-incline-dumbbell-raise",
    "muscleGroup": "shoulders",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Single-arm Cable Front Raise",
    "id": "front-cable-raise",
    "muscleGroup": "shoulders",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Two-Arm Kettlebell Military Press",
    "id": "two-arm-kettlebell-military-press",
    "muscleGroup": "shoulders",
    "equipmentType": "Kettlebells",
    "exerciseType": "strength"
  },
  {
    "name": "Standing Bradford Press",
    "id": "standing-bradford-press",
    "muscleGroup": "shoulders",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Barbell Shoulder Press",
    "id": "barbell-shoulder-press",
    "muscleGroup": "shoulders",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Side Lateral Raise",
    "id": "side-lateral-raise",
    "muscleGroup": "shoulders",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Battle Ropes",
    "id": "battling-ropes",
    "muscleGroup": "shoulders",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Alternating Kettlebell Press",
    "id": "alternating-kettlebell-press",
    "muscleGroup": "shoulders",
    "equipmentType": "Kettlebells",
    "exerciseType": "strength"
  },
  {
    "name": "Single-arm Kettlebell Snatch",
    "id": "one-arm-kettlebell-snatch",
    "muscleGroup": "shoulders",
    "equipmentType": "Kettlebells",
    "exerciseType": "strength"
  },
  {
    "name": "Kettlebell Turkish Get-Up (Squat Style)",
    "id": "kettlebell-turkish-get-up-squat-style",
    "muscleGroup": "shoulders",
    "equipmentType": "",
    "exerciseType": "strength"
  },
  {
    "name": "Cable Internal Rotation",
    "id": "cable-internal-rotation",
    "muscleGroup": "shoulders",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Seated Face Pull",
    "id": "low-pulley-row-to-neck",
    "muscleGroup": "shoulders",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Dumbbell External Shoulder Rotation",
    "id": "external-rotation",
    "muscleGroup": "shoulders",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Single-arm Bent-over Cable Rear Delt Fly",
    "id": "bent-over-low-pulley-side-lateral",
    "muscleGroup": "shoulders",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Single-arm Incline Lateral Raise",
    "id": "one-arm-incline-lateral-raise",
    "muscleGroup": "shoulders",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Barbell Rear Delt Bent-over Row",
    "id": "barbell-rear-delt-row",
    "muscleGroup": "shoulders",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Seated Cable Shoulder Press",
    "id": "seated-cable-shoulder-press",
    "muscleGroup": "shoulders",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Seated Rear Delt Fly",
    "id": "seated-bent-over-rear-delt-raise",
    "muscleGroup": "shoulders",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Standing Face Pull",
    "id": "face-pull",
    "muscleGroup": "shoulders",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Standing Cable Rear Delt Row",
    "id": "cable-rope-rear-delt-rows",
    "muscleGroup": "shoulders",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Single-arm Kettlebell Clean And Jerk",
    "id": "one-arm-kettlebell-clean-and-jerk-",
    "muscleGroup": "shoulders",
    "equipmentType": "Kettlebells",
    "exerciseType": "strength"
  },
  {
    "name": "Dumbbell Raise",
    "id": "dumbbell-raise",
    "muscleGroup": "shoulders",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Barbell Upright Row",
    "id": "upright-barbell-row",
    "muscleGroup": "shoulders",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Seated Side Lateral Raise",
    "id": "seated-side-lateral-raise",
    "muscleGroup": "shoulders",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Dumbbell Lying Rear Lateral Raise",
    "id": "dumbbell-lying-rear-lateral-raise",
    "muscleGroup": "shoulders",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Incline Face-down Bar Front Raise",
    "id": "straight-raises-on-incline-bench",
    "muscleGroup": "shoulders",
    "equipmentType": "E-Z Curl Bar",
    "exerciseType": "strength"
  },
  {
    "name": "Internal Rotation With Band",
    "id": "internal-rotation-with-band",
    "muscleGroup": "shoulders",
    "equipmentType": "Bands",
    "exerciseType": "strength"
  },
  {
    "name": "Dumbbell Iron Cross Squat",
    "id": "iron-cross",
    "muscleGroup": "shoulders",
    "equipmentType": "",
    "exerciseType": "strength"
  },
  {
    "name": "Standing Low-Pulley Deltoid Raise",
    "id": "standing-low-pulley-deltoid-raise",
    "muscleGroup": "shoulders",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Band Pull Apart",
    "id": "band-pull-apart",
    "muscleGroup": "shoulders",
    "equipmentType": "Bands",
    "exerciseType": "strength"
  },
  {
    "name": "Standing Crossed-cable Rear Delt Fly",
    "id": "cable-rear-delt-fly",
    "muscleGroup": "shoulders",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Kettlebell Turkish Get-Up (Lunge Style)",
    "id": "kettlebell-turkish-get-up-lunge-style",
    "muscleGroup": "shoulders",
    "equipmentType": "Kettlebells",
    "exerciseType": "strength"
  },
  {
    "name": "Reverse Machine Flyes",
    "id": "reverse-machine-flyes",
    "muscleGroup": "shoulders",
    "equipmentType": "Machine",
    "exerciseType": "strength"
  },
  {
    "name": "Bradford/Rocky Presses",
    "id": "bradfordrocky-presses",
    "muscleGroup": "shoulders",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Incline Anti-gravity Shoulder Press",
    "id": "anti-gravity-press",
    "muscleGroup": "shoulders",
    "equipmentType": "E-Z Curl Bar",
    "exerciseType": "strength"
  },
  {
    "name": "Head-on-bench Dumbbell Rear Delt Raise",
    "id": "bent-over-dumbbell-rear-delt-raise-with-head-on-bench",
    "muscleGroup": "shoulders",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Lying Rear Delt Fly",
    "id": "lying-rear-delt-raise",
    "muscleGroup": "shoulders",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Cable Shoulder Press",
    "id": "cable-shoulder-press",
    "muscleGroup": "shoulders",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Back Flyes - With Bands",
    "id": "back-flyes-with-bands",
    "muscleGroup": "shoulders",
    "equipmentType": "Bands",
    "exerciseType": "strength"
  },
  {
    "name": "Machine Shoulder (Military) Press",
    "id": "machine-shoulder-military-press",
    "muscleGroup": "shoulders",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Cuban Press",
    "id": "cuban-press",
    "muscleGroup": "shoulders",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Reverse Flyes With External Rotation",
    "id": "reverse-flyes-with-external-rotation",
    "muscleGroup": "shoulders",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Alternating Cable Shoulder Press",
    "id": "alternating-cable-shoulder-press",
    "muscleGroup": "shoulders",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Standing Barbell Press Behind Neck",
    "id": "standing-barbell-press-behind-neck",
    "muscleGroup": "shoulders",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Single-arm Side Lying Rear Fly",
    "id": "lying-one-arm-lateral-raise",
    "muscleGroup": "shoulders",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Lateral Raise - With Bands",
    "id": "lateral-raise-with-bands",
    "muscleGroup": "shoulders",
    "equipmentType": "Bands",
    "exerciseType": "strength"
  },
  {
    "name": "Single-arm Dumbbell Upright Row",
    "id": "dumbbell-one-arm-upright-row",
    "muscleGroup": "shoulders",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Kettlebell Pirate Ship",
    "id": "kettlebell-pirate-ships",
    "muscleGroup": "shoulders",
    "equipmentType": "Kettlebells",
    "exerciseType": "strength"
  },
  {
    "name": "Dumbbell Scaption",
    "id": "dumbbell-scaption",
    "muscleGroup": "shoulders",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "See-Saw Press (Alternating Side Press)",
    "id": "see-saw-press-alternating-side-press",
    "muscleGroup": "shoulders",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Shoulder Press - With Bands",
    "id": "shoulder-press-with-bands",
    "muscleGroup": "shoulders",
    "equipmentType": "Bands",
    "exerciseType": "strength"
  },
  {
    "name": "Two-Arm Kettlebell Clean",
    "id": "two-arm-kettlebell-clean",
    "muscleGroup": "shoulders",
    "equipmentType": "Kettlebells",
    "exerciseType": "strength"
  },
  {
    "name": "Double Kettlebell Push Press",
    "id": "double-kettlebell-push-press",
    "muscleGroup": "shoulders",
    "equipmentType": "Kettlebells",
    "exerciseType": "strength"
  },
  {
    "name": "Barbell Front Raise",
    "id": "barbell-front-raise",
    "muscleGroup": "shoulders",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Dumbbell Incline Shoulder Raise",
    "id": "dumbbell-incline-shoulder-raise",
    "muscleGroup": "shoulders",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Overhead Bar Front Raise",
    "id": "standing-front-barbell-raise-over-head",
    "muscleGroup": "shoulders",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Single-arm Smith Machine Upright Row",
    "id": "smith-machine-one-arm-upright-row",
    "muscleGroup": "shoulders",
    "equipmentType": "Machine",
    "exerciseType": "strength"
  },
  {
    "name": "Machine Lateral Raise",
    "id": "machine-lateral-raise",
    "muscleGroup": "shoulders",
    "equipmentType": "Machine",
    "exerciseType": "strength"
  },
  {
    "name": "Kettlebell Seated Press",
    "id": "kettlebell-seated-press",
    "muscleGroup": "shoulders",
    "equipmentType": "Kettlebells",
    "exerciseType": "strength"
  },
  {
    "name": "Double Kettlebell Jerk",
    "id": "double-kettlebell-jerk",
    "muscleGroup": "shoulders",
    "equipmentType": "Kettlebells",
    "exerciseType": "strength"
  },
  {
    "name": "Landmine Linear Jammer",
    "id": "landmine-linear-jammer",
    "muscleGroup": "shoulders",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Kettlebell Arnold Press",
    "id": "kettlebell-arnold-press-",
    "muscleGroup": "shoulders",
    "equipmentType": "Kettlebells",
    "exerciseType": "strength"
  },
  {
    "name": "Cable Seated Lateral Raise",
    "id": "cable-seated-lateral-raise",
    "muscleGroup": "shoulders",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Incline Barbell Shoulder Protraction",
    "id": "barbell-incline-shoulder-raise",
    "muscleGroup": "shoulders",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Double-kettlebell Windmill",
    "id": "double-kettlebell-windmill",
    "muscleGroup": "shoulders",
    "equipmentType": "Kettlebells",
    "exerciseType": "strength"
  },
  {
    "name": "Single-arm Half-kneeling Shoulder Press",
    "id": "half-kneeling-dumbbell-shoulder-press",
    "muscleGroup": "shoulders",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Hand Stand Push-Up",
    "id": "hand-stand-push-up",
    "muscleGroup": "shoulders",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Wall Walk",
    "id": "wall-walk",
    "muscleGroup": "shoulders",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Sled Reverse Flye",
    "id": "sled-reverse-flye",
    "muscleGroup": "shoulders",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Wall Shoulder Tap",
    "id": "wall-shoulder-tap",
    "muscleGroup": "shoulders",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Plate Shoulder Circle Big To Small",
    "id": "plate-shoulder-circle-big-to-small-rotation",
    "muscleGroup": "shoulders",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "One-Arm Kettlebell Split Snatch",
    "id": "one-arm-kettlebell-split-snatch-",
    "muscleGroup": "shoulders",
    "equipmentType": "Kettlebells",
    "exerciseType": "strength"
  },
  {
    "name": "One-Arm Kettlebell Para Press",
    "id": "one-arm-kettlebell-para-press-",
    "muscleGroup": "shoulders",
    "equipmentType": "Kettlebells",
    "exerciseType": "strength"
  },
  {
    "name": "Bear Crawl Shoulder Tap",
    "id": "bear-crawl-shoulder-tap",
    "muscleGroup": "shoulders",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "External Rotation With Band",
    "id": "external-rotation-with-band",
    "muscleGroup": "shoulders",
    "equipmentType": "Bands",
    "exerciseType": "strength"
  },
  {
    "name": "Sled Overhead Backward Walk",
    "id": "sled-overhead-backward-walk",
    "muscleGroup": "shoulders",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Smith Incline Shoulder Raise",
    "id": "smith-incline-shoulder-raise",
    "muscleGroup": "shoulders",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "One-Arm Kettlebell Split Jerk",
    "id": "one-arm-kettlebell-split-jerk",
    "muscleGroup": "shoulders",
    "equipmentType": "Kettlebells",
    "exerciseType": "strength"
  },
  {
    "name": "Kettlebell Seesaw Press",
    "id": "kettlebell-seesaw-press",
    "muscleGroup": "shoulders",
    "equipmentType": "",
    "exerciseType": "strength"
  },
  {
    "name": "One-Arm Kettlebell Military Press To The Side",
    "id": "one-arm-kettlebell-military-press-to-the-side",
    "muscleGroup": "shoulders",
    "equipmentType": "Kettlebells",
    "exerciseType": "strength"
  },
  {
    "name": "One-Arm Kettlebell Jerk",
    "id": "one-arm-kettlebell-jerk",
    "muscleGroup": "shoulders",
    "equipmentType": "Kettlebells",
    "exerciseType": "strength"
  },
  {
    "name": "Double Kettlebell Snatch",
    "id": "double-kettlebell-snatch",
    "muscleGroup": "shoulders",
    "equipmentType": "Kettlebells",
    "exerciseType": "strength"
  },
  {
    "name": "Standing Suspended Rear Delt Fly",
    "id": "suspended-back-fly",
    "muscleGroup": "shoulders",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Waiter\u0027s Carry",
    "id": "waiters-carry",
    "muscleGroup": "shoulders",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Dumbbell Clean And Jerk",
    "id": "dumbbell-clean-and-jerk",
    "muscleGroup": "shoulders",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Two-Arm Kettlebell Jerk",
    "id": "two-arm-kettlebell-jerk",
    "muscleGroup": "shoulders",
    "equipmentType": "Kettlebells",
    "exerciseType": "strength"
  },
  {
    "name": "Towel Dumbbell Front Raise",
    "id": "front-dumbbell-raise-using-towel",
    "muscleGroup": "shoulders",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Side Wrist Pull",
    "id": "side-wrist-pull",
    "muscleGroup": "shoulders",
    "equipmentType": "None",
    "exerciseType": "stretching"
  },
  {
    "name": "Upward Stretch",
    "id": "upward-stretch",
    "muscleGroup": "shoulders",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Shoulder Circles",
    "id": "shoulder-circles",
    "muscleGroup": "shoulders",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Cross-body Shoulder Stretch",
    "id": "shoulder-stretch",
    "muscleGroup": "shoulders",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Elbow Circles",
    "id": "elbow-circles",
    "muscleGroup": "shoulders",
    "equipmentType": "None",
    "exerciseType": "stretching"
  },
  {
    "name": "Bar Shoulder Extension Stretch",
    "id": "round-the-world-shoulder-stretch",
    "muscleGroup": "shoulders",
    "equipmentType": "Other",
    "exerciseType": "stretching"
  },
  {
    "name": "Arm Circle",
    "id": "arm-circles",
    "muscleGroup": "shoulders",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Seated Front Deltoid",
    "id": "seated-front-deltoid",
    "muscleGroup": "shoulders",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Chair Upper Body Stretch",
    "id": "chair-upper-body-stretch",
    "muscleGroup": "shoulders",
    "equipmentType": "Other",
    "exerciseType": "stretching"
  },
  {
    "name": "Shoulder Raise",
    "id": "shoulder-raise",
    "muscleGroup": "shoulders",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Mountain Climber",
    "id": "mountain-climbers",
    "muscleGroup": "abdominals",
    "equipmentType": "Body Only",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Sledgehammer Swing",
    "id": "sledgehammer-swings",
    "muscleGroup": "abdominals",
    "equipmentType": "Other",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Sit-up With Single-arm Overhand Throw",
    "id": "supine-one-arm-overhead-throw",
    "muscleGroup": "abdominals",
    "equipmentType": "Medicine Ball",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Medicine Ball Partner Twist",
    "id": "medicine-ball-full-twist",
    "muscleGroup": "abdominals",
    "equipmentType": "Medicine Ball",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Wall Mountain Climber",
    "id": "wall-mountain-climber",
    "muscleGroup": "abdominals",
    "equipmentType": "Body Only",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Landmine Twist",
    "id": "landmine-180s",
    "muscleGroup": "abdominals",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Elbow Plank",
    "id": "plank",
    "muscleGroup": "abdominals",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Bottoms Up",
    "id": "bottoms-up",
    "muscleGroup": "abdominals",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Suspended Ab Fall-out",
    "id": "suspended-fallout",
    "muscleGroup": "abdominals",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Dumbbell V-Sit Cross Jab",
    "id": "dumbbell-v-sit-cross-jab",
    "muscleGroup": "abdominals",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Standing Cable Low-to-high Twist",
    "id": "standing-cable-lift",
    "muscleGroup": "abdominals",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Dumbbell Spell Caster",
    "id": "spell-caster",
    "muscleGroup": "abdominals",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Decline Reverse Crunch",
    "id": "decline-reverse-crunch",
    "muscleGroup": "abdominals",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Spider Crawl",
    "id": "spider-crawl",
    "muscleGroup": "abdominals",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Cocoons",
    "id": "cocoons",
    "muscleGroup": "abdominals",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Cross-Body Crunch",
    "id": "cross-body-crunch",
    "muscleGroup": "abdominals",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Single-arm High-cable Side Bend",
    "id": "one-arm-high-pulley-cable-side-bends",
    "muscleGroup": "abdominals",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Elbow-to-knee Crunch",
    "id": "elbow-to-knee",
    "muscleGroup": "abdominals",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Decline Crunch",
    "id": "decline-crunch",
    "muscleGroup": "abdominals",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Hanging Toes-to-bar",
    "id": "hanging-pike",
    "muscleGroup": "abdominals",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Kneeling Cable Oblique Crunch",
    "id": "oblique-cable-crunch",
    "muscleGroup": "abdominals",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Hanging Oblique Knee Raise",
    "id": "hanging-oblique-knee-raise",
    "muscleGroup": "abdominals",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Dumbbell Suitcase Crunch",
    "id": "weighted-suitcase-crunch",
    "muscleGroup": "abdominals",
    "equipmentType": "Medicine Ball",
    "exerciseType": "strength"
  },
  {
    "name": "Plate Twist",
    "id": "plate-twist",
    "muscleGroup": "abdominals",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Gorilla Chin/Crunch",
    "id": "gorilla-chincrunch",
    "muscleGroup": "abdominals",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Kneeling Cable Crunch With Alternating Oblique Twists",
    "id": "kneeling-cable-crunch-with-alternating-oblique-twists",
    "muscleGroup": "abdominals",
    "equipmentType": "Cables",
    "exerciseType": "strength"
  },
  {
    "name": "Weighted Crunches",
    "id": "weighted-crunches",
    "muscleGroup": "abdominals",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Barbell Roll-out",
    "id": "barbell-ab-rollout",
    "muscleGroup": "abdominals",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Kneeling Cable Crunch",
    "id": "cable-crunch",
    "muscleGroup": "abdominals",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Exercise Ball Pull-In",
    "id": "exercise-ball-pull-in",
    "muscleGroup": "abdominals",
    "equipmentType": "Exercise Ball",
    "exerciseType": "strength"
  },
  {
    "name": "Hanging Leg Raise",
    "id": "hanging-leg-raise",
    "muscleGroup": "abdominals",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Barbell Ab Rollout - On Knees",
    "id": "barbell-ab-rollout-on-knees",
    "muscleGroup": "abdominals",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Ab Roller",
    "id": "ab-roller",
    "muscleGroup": "abdominals",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Otis-Up",
    "id": "otis-up",
    "muscleGroup": "abdominals",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Ab Bicycle",
    "id": "air-bike",
    "muscleGroup": "abdominals",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "3/4 Sit-up",
    "id": "34-sit-up",
    "muscleGroup": "abdominals",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Reverse Crunch",
    "id": "reverse-crunch",
    "muscleGroup": "abdominals",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Crunches",
    "id": "crunches",
    "muscleGroup": "abdominals",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Dumbbell Side Bend",
    "id": "dumbbell-side-bend",
    "muscleGroup": "abdominals",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Captain\u0027s Chair Knee Raise",
    "id": "kneehip-raise-on-parallel-bars",
    "muscleGroup": "abdominals",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Dead Bug Reach",
    "id": "dead-bug",
    "muscleGroup": "abdominals",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Rope Crunch",
    "id": "rope-crunch",
    "muscleGroup": "abdominals",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Standing Cable Crunch",
    "id": "standing-rope-crunch",
    "muscleGroup": "abdominals",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Crunch - Hands Overhead",
    "id": "crunch-hands-overhead",
    "muscleGroup": "abdominals",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "V-up",
    "id": "jackknife-sit-up",
    "muscleGroup": "abdominals",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Decline Oblique Crunch",
    "id": "decline-oblique-crunch",
    "muscleGroup": "abdominals",
    "equipmentType": "None",
    "exerciseType": "strength"
  },
  {
    "name": "Decline Bar Press Sit-up",
    "id": "press-sit-up",
    "muscleGroup": "abdominals",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Bosu Ball Cable Crunch With Side Bends",
    "id": "bosu-ball-cable-crunch-with-side-bends",
    "muscleGroup": "abdominals",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Exercise Ball Crunch",
    "id": "exercise-ball-crunch",
    "muscleGroup": "abdominals",
    "equipmentType": "Exercise Ball",
    "exerciseType": "strength"
  },
  {
    "name": "Russian Twist",
    "id": "russian-twist",
    "muscleGroup": "abdominals",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Seated Flat Bench Leg Pull-In",
    "id": "seated-flat-bench-leg-pull-in",
    "muscleGroup": "abdominals",
    "equipmentType": "Weight Bench",
    "exerciseType": "strength"
  },
  {
    "name": "Flat Bench Lying Leg Raise",
    "id": "flat-bench-lying-leg-raise",
    "muscleGroup": "abdominals",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Pallof Press",
    "id": "pallof-press",
    "muscleGroup": "abdominals",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Knees Tucked Crunch",
    "id": "tuck-crunch",
    "muscleGroup": "abdominals",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Butt-Ups",
    "id": "butt-ups",
    "muscleGroup": "abdominals",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Bench Barbell Roll-out",
    "id": "barbell-rollout-from-bench",
    "muscleGroup": "abdominals",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Feet-elevated Oblique Crunch",
    "id": "oblique-crunches",
    "muscleGroup": "abdominals",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Advanced Kettlebell Windmill",
    "id": "advanced-kettlebell-windmill",
    "muscleGroup": "abdominals",
    "equipmentType": "Kettlebells",
    "exerciseType": "strength"
  },
  {
    "name": "Standing Cable Wood Chop",
    "id": "standing-cable-wood-chop",
    "muscleGroup": "abdominals",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Cable Reverse Crunch",
    "id": "cable-reverse-crunch",
    "muscleGroup": "abdominals",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Bent-knee Reverse Crunch",
    "id": "bent-knee-hip-raise",
    "muscleGroup": "abdominals",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Cable Russian Twists",
    "id": "cable-russian-twists",
    "muscleGroup": "abdominals",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Ab Crunch Machine",
    "id": "ab-crunch-machine",
    "muscleGroup": "abdominals",
    "equipmentType": "Machine",
    "exerciseType": "strength"
  },
  {
    "name": "Alternating Heel-touch",
    "id": "alternate-heel-touchers",
    "muscleGroup": "abdominals",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Hanging Wind Sprint",
    "id": "wind-sprints",
    "muscleGroup": "abdominals",
    "equipmentType": "",
    "exerciseType": "strength"
  },
  {
    "name": "Smith Machine Straight-legged Hip Raise",
    "id": "smith-machine-hip-raise",
    "muscleGroup": "abdominals",
    "equipmentType": "Machine",
    "exerciseType": "strength"
  },
  {
    "name": "Weighted Sit-Ups - With Bands",
    "id": "weighted-sit-ups-with-bands",
    "muscleGroup": "abdominals",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Pallof Press With Rotation",
    "id": "pallof-press-with-rotation",
    "muscleGroup": "abdominals",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Suspended Reverse Crunch",
    "id": "suspended-reverse-crunch",
    "muscleGroup": "abdominals",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Frog Sit-Ups",
    "id": "frog-sit-ups",
    "muscleGroup": "abdominals",
    "equipmentType": "Mat",
    "exerciseType": "strength"
  },
  {
    "name": "Kettlebell Windmill",
    "id": "kettlebell-windmill",
    "muscleGroup": "abdominals",
    "equipmentType": "Kettlebells",
    "exerciseType": "strength"
  },
  {
    "name": "Cable Seated Crunch",
    "id": "cable-seated-crunch",
    "muscleGroup": "abdominals",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Kettlebell Figure 8",
    "id": "kettlebell-figure-8",
    "muscleGroup": "abdominals",
    "equipmentType": "Kettlebells",
    "exerciseType": "strength"
  },
  {
    "name": "Lying Bench Reverse Crunch",
    "id": "flat-bench-leg-pull-in",
    "muscleGroup": "abdominals",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Sit-up",
    "id": "sit-up",
    "muscleGroup": "abdominals",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Side Bridge",
    "id": "side-bridge",
    "muscleGroup": "abdominals",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Lying Oblique Crunch",
    "id": "oblique-crunches-on-the-floor",
    "muscleGroup": "abdominals",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Janda Sit-Up",
    "id": "janda-sit-up",
    "muscleGroup": "abdominals",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Leg Pull-In",
    "id": "leg-pull-in",
    "muscleGroup": "abdominals",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Side Jackknife",
    "id": "side-jackknife",
    "muscleGroup": "abdominals",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Kettlebell Pass Between The Legs",
    "id": "kettlebell-pass-between-the-legs",
    "muscleGroup": "abdominals",
    "equipmentType": "Kettlebells",
    "exerciseType": "strength"
  },
  {
    "name": "Feet-elevated Crunch",
    "id": "crunch-legs-on-exercise-ball",
    "muscleGroup": "abdominals",
    "equipmentType": "Exercise Ball",
    "exerciseType": "strength"
  },
  {
    "name": "Seated Leg Tuck",
    "id": "seated-leg-tucks",
    "muscleGroup": "abdominals",
    "equipmentType": "",
    "exerciseType": "strength"
  },
  {
    "name": "Barbell Side Bend",
    "id": "barbell-side-bend",
    "muscleGroup": "abdominals",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Weighted Ball Side Bend",
    "id": "weighted-ball-side-bend",
    "muscleGroup": "abdominals",
    "equipmentType": "Exercise Ball",
    "exerciseType": "strength"
  },
  {
    "name": "Bent Press",
    "id": "bent-press",
    "muscleGroup": "abdominals",
    "equipmentType": "Kettlebells",
    "exerciseType": "strength"
  },
  {
    "name": "Cable Judo Flip",
    "id": "cable-judo-flip",
    "muscleGroup": "abdominals",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Seated Bar Twist",
    "id": "seated-barbell-twist",
    "muscleGroup": "abdominals",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Medicine Ball Rotational Throw",
    "id": "medicine-ball-rotational-throw",
    "muscleGroup": "abdominals",
    "equipmentType": "Medicine Ball",
    "exerciseType": "strength"
  },
  {
    "name": "Bosu Ball Crunch",
    "id": "bosu-ball-crunch",
    "muscleGroup": "abdominals",
    "equipmentType": "Bosu Ball",
    "exerciseType": "strength"
  },
  {
    "name": "Suitcase Crunch",
    "id": "suitcase-crunch",
    "muscleGroup": "abdominals",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Seated Scissor Kick",
    "id": "seated-scissor-kick",
    "muscleGroup": "abdominals",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Hollow-hold Ball Toss",
    "id": "v-sit-lying-down-ball-throw-and-catch",
    "muscleGroup": "abdominals",
    "equipmentType": "Medicine Ball",
    "exerciseType": "strength"
  },
  {
    "name": "Partner Resistance Standing Twist",
    "id": "partner-resistance-standing-twist",
    "muscleGroup": "abdominals",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Cross Crunch",
    "id": "cross-crunch",
    "muscleGroup": "abdominals",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Full Moon",
    "id": "full-moon",
    "muscleGroup": "abdominals",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Partner Front Russian Twist And Pass",
    "id": "partner-3-touch-motion-russian-twist",
    "muscleGroup": "abdominals",
    "equipmentType": "Medicine Ball",
    "exerciseType": "strength"
  },
  {
    "name": "Hanging Knee Raise With Manual Resistance",
    "id": "partner-hanging-knee-raise-with-manual-resistance",
    "muscleGroup": "abdominals",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Kettlebell 3-point Leg Extension",
    "id": "kettlebell-3-point-extension",
    "muscleGroup": "abdominals",
    "equipmentType": "Kettlebells",
    "exerciseType": "strength"
  },
  {
    "name": "Straight-Legged Hip Raise",
    "id": "straight-legged-hip-raise",
    "muscleGroup": "abdominals",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Skin The Cat To Push-Up",
    "id": "skin-the-cat-to-push-up",
    "muscleGroup": "abdominals",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Partner Lying Leg Raise With Lateral Throw Down",
    "id": "partner-lying-leg-raise-with-lateral-throw-down",
    "muscleGroup": "abdominals",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Partner Plank With High-five",
    "id": "partner-facing-planks-with-alternating-high-five",
    "muscleGroup": "abdominals",
    "equipmentType": "",
    "exerciseType": "strength"
  },
  {
    "name": "Partner Side Russian Twist And Pass",
    "id": "partner-side-to-side-russian-twist-pass",
    "muscleGroup": "abdominals",
    "equipmentType": "Medicine Ball",
    "exerciseType": "strength"
  },
  {
    "name": "Hanging Leg Raise With Throw Down",
    "id": "partner-hanging-knee-raise-with-throw-down",
    "muscleGroup": "abdominals",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Partner Sit-up With High-five",
    "id": "partner-sit-up-with-high-five",
    "muscleGroup": "abdominals",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Exercise Ball Knee Roll-in",
    "id": "stability-ball-pike-with-knee-tuck",
    "muscleGroup": "abdominals",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Partner Lying Leg Raise With Throw Down",
    "id": "partner-lying-leg-raise-with-throw-down",
    "muscleGroup": "abdominals",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Crab Toe-touch",
    "id": "crab-toe-touch",
    "muscleGroup": "abdominals",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Side Kick-through",
    "id": "breakdancer",
    "muscleGroup": "abdominals",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Partner Target Sit-up",
    "id": "partner-target-sit-up",
    "muscleGroup": "abdominals",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Partner Plank Band Row",
    "id": "partner-facing-plank-with-band-row",
    "muscleGroup": "abdominals",
    "equipmentType": "Bands",
    "exerciseType": "strength"
  },
  {
    "name": "Suspended Crunch",
    "id": "suspended-crunch",
    "muscleGroup": "abdominals",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Stomach Vacuum",
    "id": "stomach-vacuum",
    "muscleGroup": "abdominals",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Scissor Kick",
    "id": "scissor-kick",
    "muscleGroup": "abdominals",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Toe Touchers",
    "id": "toe-touchers",
    "muscleGroup": "abdominals",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Lower Back Curl",
    "id": "lower-back-curl",
    "muscleGroup": "abdominals",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Exercise Ball Torso Rotation",
    "id": "torso-rotation",
    "muscleGroup": "abdominals",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Seated Overhead Stretch",
    "id": "seated-overhead-stretch",
    "muscleGroup": "abdominals",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Overhead Stretch",
    "id": "overhead-stretch",
    "muscleGroup": "abdominals",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Single-leg Cable Hip Extension",
    "id": "one-legged-cable-kickback",
    "muscleGroup": "glutes",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Glute Bridge",
    "id": "butt-lift-bridge",
    "muscleGroup": "glutes",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Single-leg Glute Bridge",
    "id": "single-leg-glute-bridge",
    "muscleGroup": "glutes",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Step-up With Knee Raise",
    "id": "step-up-with-knee-raise",
    "muscleGroup": "glutes",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Kettlebell Thruster",
    "id": "kettlebell-thruster",
    "muscleGroup": "glutes",
    "equipmentType": "Kettlebells",
    "exerciseType": "strength"
  },
  {
    "name": "Flutter Kicks",
    "id": "flutter-kicks",
    "muscleGroup": "glutes",
    "equipmentType": "Weight Bench",
    "exerciseType": "strength"
  },
  {
    "name": "Glute Kickback",
    "id": "glute-kickback",
    "muscleGroup": "glutes",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Exercise Ball Hip Thrust",
    "id": "physioball-hip-bridge",
    "muscleGroup": "glutes",
    "equipmentType": "Exercise Ball",
    "exerciseType": "strength"
  },
  {
    "name": "Pull Through",
    "id": "pull-through",
    "muscleGroup": "glutes",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Hip Extension With Bands",
    "id": "hip-extension-with-bands",
    "muscleGroup": "glutes",
    "equipmentType": "Bands",
    "exerciseType": "strength"
  },
  {
    "name": "Standing Hip Extension",
    "id": "leg-lift",
    "muscleGroup": "glutes",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Downward Facing Balance",
    "id": "downward-facing-balance",
    "muscleGroup": "glutes",
    "equipmentType": "Exercise Ball",
    "exerciseType": "strength"
  },
  {
    "name": "Glute Bridge Hamstring Walkout",
    "id": "glute-bridge-hamstring-walkout",
    "muscleGroup": "glutes",
    "equipmentType": "",
    "exerciseType": "strength"
  },
  {
    "name": "Suspended Hip Thrust",
    "id": "suspended-hip-thrust",
    "muscleGroup": "glutes",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Neck Bridge Supine",
    "id": "neck-bridge-supine",
    "muscleGroup": "glutes",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Piriformis SMR",
    "id": "piriformis-smr",
    "muscleGroup": "glutes",
    "equipmentType": "Foam Roll",
    "exerciseType": "stretching"
  },
  {
    "name": "Lying Glute Stretch",
    "id": "ankle-on-the-knee",
    "muscleGroup": "glutes",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Knee Across The Body",
    "id": "knee-across-the-body",
    "muscleGroup": "glutes",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Seated Glute",
    "id": "seated-glute",
    "muscleGroup": "glutes",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Lying Glute",
    "id": "lying-glute",
    "muscleGroup": "glutes",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "One Knee To Chest",
    "id": "one-knee-to-chest",
    "muscleGroup": "glutes",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Seated Glute Stretch",
    "id": "seated-glute-stretch",
    "muscleGroup": "glutes",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Incline Hammer Curls",
    "id": "incline-hammer-curls",
    "muscleGroup": "biceps",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Wide-grip Barbell Curl",
    "id": "wide-grip-standing-barbell-curl",
    "muscleGroup": "biceps",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "EZ-bar Spider Curl",
    "id": "spider-curl",
    "muscleGroup": "biceps",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Hammer Curls",
    "id": "hammer-curls",
    "muscleGroup": "biceps",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "EZ-Bar Curl",
    "id": "ez-bar-curl",
    "muscleGroup": "biceps",
    "equipmentType": "E-Z Curl Bar",
    "exerciseType": "strength"
  },
  {
    "name": "Zottman Curl",
    "id": "zottman-curl",
    "muscleGroup": "biceps",
    "equipmentType": "",
    "exerciseType": "strength"
  },
  {
    "name": "Biceps Curl To Shoulder Press",
    "id": "biceps-curl-to-shoulder-press",
    "muscleGroup": "biceps",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Barbell Curl",
    "id": "barbell-curl",
    "muscleGroup": "biceps",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Concentration Curl",
    "id": "concentration-curls",
    "muscleGroup": "biceps",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Flexor Incline Dumbbell Curls",
    "id": "flexor-incline-dumbbell-curls",
    "muscleGroup": "biceps",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Machine Bicep Curl",
    "id": "machine-bicep-curl",
    "muscleGroup": "biceps",
    "equipmentType": "Machine",
    "exerciseType": "strength"
  },
  {
    "name": "Overhead Cable Curl",
    "id": "overhead-cable-curl",
    "muscleGroup": "biceps",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Dumbbell Bicep Curl",
    "id": "dumbbell-bicep-curl",
    "muscleGroup": "biceps",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Close-grip EZ-bar Curl",
    "id": "close-grip-ez-bar-curl",
    "muscleGroup": "biceps",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Cross-body Hammer Curl",
    "id": "cross-body-hammer-curl",
    "muscleGroup": "biceps",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Preacher Curl",
    "id": "preacher-curl",
    "muscleGroup": "biceps",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Barbell Curls Lying Against An Incline",
    "id": "barbell-curls-lying-against-an-incline",
    "muscleGroup": "biceps",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Seated Close-Grip Concentration Barbell Curl",
    "id": "seated-close-grip-concentration-barbell-curl",
    "muscleGroup": "biceps",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Reverse Barbell Preacher Curls",
    "id": "reverse-barbell-preacher-curls",
    "muscleGroup": "biceps",
    "equipmentType": "E-Z Curl Bar",
    "exerciseType": "strength"
  },
  {
    "name": "Standing One-Arm Cable Curl",
    "id": "standing-one-arm-cable-curl",
    "muscleGroup": "biceps",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Dumbbell Alternate Bicep Curl",
    "id": "dumbbell-alternate-bicep-curl",
    "muscleGroup": "biceps",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Single-arm Dumbbell Preacher Curl",
    "id": "one-arm-dumbbell-preacher-curl",
    "muscleGroup": "biceps",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Alternate Incline Dumbbell Curl",
    "id": "alternate-incline-dumbbell-curl",
    "muscleGroup": "biceps",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Standing Concentration Curl",
    "id": "standing-concentration-curl",
    "muscleGroup": "biceps",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Reverse Cable Curl",
    "id": "reverse-cable-curl",
    "muscleGroup": "biceps",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Alternating Incline Dumbbell Biceps Curl",
    "id": "incline-dumbbell-curl",
    "muscleGroup": "biceps",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Alternate Hammer Curl",
    "id": "alternate-hammer-curl",
    "muscleGroup": "biceps",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Seated Dumbbell Biceps Curl",
    "id": "seated-dumbbell-curl",
    "muscleGroup": "biceps",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Preacher Hammer Dumbbell Curl",
    "id": "preacher-hammer-dumbbell-curl",
    "muscleGroup": "biceps",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Standing One-Arm Dumbbell Curl Over Incline Bench",
    "id": "standing-one-arm-dumbbell-curl-over-incline-bench",
    "muscleGroup": "biceps",
    "equipmentType": "",
    "exerciseType": "strength"
  },
  {
    "name": "Close-grip Barbell Curl",
    "id": "close-grip-standing-barbell-curl",
    "muscleGroup": "biceps",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Standing Biceps Cable Curl",
    "id": "standing-biceps-cable-curl",
    "muscleGroup": "biceps",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Drag Curl",
    "id": "drag-curl",
    "muscleGroup": "biceps",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Dumbbell Preacher Curl",
    "id": "two-arm-dumbbell-preacher-curl",
    "muscleGroup": "biceps",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Lying Supine Dumbbell Curl",
    "id": "lying-supine-dumbbell-curl",
    "muscleGroup": "biceps",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Machine Preacher Curls",
    "id": "machine-preacher-curls",
    "muscleGroup": "biceps",
    "equipmentType": "Machine",
    "exerciseType": "strength"
  },
  {
    "name": "Reverse-grip Barbell Curl",
    "id": "reverse-barbell-curl",
    "muscleGroup": "biceps",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Cable Rope Hammer Curl",
    "id": "cable-hammer-curls-rope-attachment",
    "muscleGroup": "biceps",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Lying Cable Biceps Curl",
    "id": "lying-cable-curl",
    "muscleGroup": "biceps",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Standing Dumbbell Reverse Curl",
    "id": "standing-dumbbell-reverse-curl",
    "muscleGroup": "biceps",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Palms-out Incline Biceps Curl",
    "id": "incline-inner-biceps-curl",
    "muscleGroup": "biceps",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Close-Grip EZ-Bar Curl With Band",
    "id": "close-grip-ez-bar-curl-with-band",
    "muscleGroup": "biceps",
    "equipmentType": "E-Z Curl Bar",
    "exerciseType": "strength"
  },
  {
    "name": "Straight-arm Plank With Biceps Curl",
    "id": "one-arm-plank-dumbbell-biceps-curl",
    "muscleGroup": "biceps",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Face-down Incline Dumbbell Biceps Curl",
    "id": "dumbbell-prone-incline-curl",
    "muscleGroup": "biceps",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Zottman Preacher Curl",
    "id": "zottman-preacher-curl",
    "muscleGroup": "biceps",
    "equipmentType": "",
    "exerciseType": "strength"
  },
  {
    "name": "Cable Rope Preacher Hammer Curl",
    "id": "cable-preacher-curl",
    "muscleGroup": "biceps",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Seated Dumbbell Inner Biceps Curl",
    "id": "seated-dumbbell-inner-biceps-curl",
    "muscleGroup": "biceps",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Standing Inner-Biceps Curl",
    "id": "standing-inner-biceps-curl",
    "muscleGroup": "biceps",
    "equipmentType": "Dumbbell",
    "exerciseType": "strength"
  },
  {
    "name": "Reverse Plate Curls",
    "id": "reverse-plate-curls",
    "muscleGroup": "biceps",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Lying Close-Grip Bar Curl On High Pulley",
    "id": "lying-close-grip-bar-curl-on-high-pulley",
    "muscleGroup": "biceps",
    "equipmentType": "Cable",
    "exerciseType": "strength"
  },
  {
    "name": "Lying High Bench Barbell Curl",
    "id": "lying-high-bench-barbell-curl",
    "muscleGroup": "biceps",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Suspended Curl",
    "id": "suspended-curl",
    "muscleGroup": "biceps",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Plate Hammer Curl",
    "id": "hammer-plate-curl",
    "muscleGroup": "biceps",
    "equipmentType": "Other",
    "exerciseType": "strength"
  },
  {
    "name": "Seated Wide-grip Curl To Close-grip Curl",
    "id": "seated-straight-bar-curl-superset",
    "muscleGroup": "biceps",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Seated Straigh-Bar Curl Superset",
    "id": "seated-straigh-bar-curl-superset",
    "muscleGroup": "biceps",
    "equipmentType": "Barbell",
    "exerciseType": "strength"
  },
  {
    "name": "Standing Biceps Stretch",
    "id": "standing-biceps-stretch",
    "muscleGroup": "biceps",
    "equipmentType": "Other",
    "exerciseType": "stretching"
  },
  {
    "name": "Seated Biceps",
    "id": "seated-biceps",
    "muscleGroup": "biceps",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Brachialis SMR",
    "id": "brachialis-smr",
    "muscleGroup": "biceps",
    "equipmentType": "Foam Roll",
    "exerciseType": "stretching"
  },
  {
    "name": "Lateral Hop",
    "id": "lateral-bound-",
    "muscleGroup": "adductors",
    "equipmentType": "Body Only",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Carioca Quick Step",
    "id": "carioca-quick-step",
    "muscleGroup": "adductors",
    "equipmentType": "Body Only",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Lateral Cone Hop",
    "id": "lateral-cone-hops",
    "muscleGroup": "adductors",
    "equipmentType": "Body Only",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Lateral Box Jump",
    "id": "lateral-box-jump",
    "muscleGroup": "adductors",
    "equipmentType": "Other",
    "exerciseType": "plyometrics"
  },
  {
    "name": "Thigh Adductor",
    "id": "thigh-adductor",
    "muscleGroup": "adductors",
    "equipmentType": "Machine",
    "exerciseType": "strength"
  },
  {
    "name": "Band Hip Adductions",
    "id": "band-hip-adductions",
    "muscleGroup": "adductors",
    "equipmentType": "Bands",
    "exerciseType": "strength"
  },
  {
    "name": "Groiners",
    "id": "groiners-",
    "muscleGroup": "adductors",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Side Leg Raises",
    "id": "side-leg-raises",
    "muscleGroup": "adductors",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Groin And Back Stretch",
    "id": "groin-and-back-stretch",
    "muscleGroup": "adductors",
    "equipmentType": "None",
    "exerciseType": "stretching"
  },
  {
    "name": "Adductor SMR",
    "id": "adductor",
    "muscleGroup": "adductors",
    "equipmentType": "Foam Roll",
    "exerciseType": "stretching"
  },
  {
    "name": "Side Lying Groin Stretch",
    "id": "side-lying-groin-stretch",
    "muscleGroup": "adductors",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Adductor/Groin",
    "id": "adductorgroin-",
    "muscleGroup": "adductors",
    "equipmentType": "None",
    "exerciseType": "stretching"
  },
  {
    "name": "Lying Bent Leg Groin",
    "id": "lying-bent-leg-groin",
    "muscleGroup": "adductors",
    "equipmentType": "Other",
    "exerciseType": "stretching"
  },
  {
    "name": "Clam",
    "id": "clam",
    "muscleGroup": "abductors",
    "equipmentType": "",
    "exerciseType": "strength"
  },
  {
    "name": "Thigh Abductor",
    "id": "thigh-abductor",
    "muscleGroup": "abductors",
    "equipmentType": "Machine",
    "exerciseType": "strength"
  },
  {
    "name": "Fire Hydrant",
    "id": "fire-hydrant",
    "muscleGroup": "abductors",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Monster Walk",
    "id": "monster-walk",
    "muscleGroup": "abductors",
    "equipmentType": "Body Only",
    "exerciseType": "strength"
  },
  {
    "name": "Lateral Band Walk",
    "id": "lateral-band-walk",
    "muscleGroup": "abductors",
    "equipmentType": "Bands",
    "exerciseType": "strength"
  },
  {
    "name": "Hip Circles (Prone)",
    "id": "hip-circles-prone",
    "muscleGroup": "abductors",
    "equipmentType": "",
    "exerciseType": "stretching"
  },
  {
    "name": "Standing Hip Circles",
    "id": "standing-hip-circles",
    "muscleGroup": "abductors",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Iliotibial Band SMR",
    "id": "iliotibial-tract-smr",
    "muscleGroup": "abductors",
    "equipmentType": "Foam Roll",
    "exerciseType": "stretching"
  },
  {
    "name": "Windmills",
    "id": "windmills",
    "muscleGroup": "abductors",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "IT Band And Glute Stretch",
    "id": "it-band-and-glute-stretch",
    "muscleGroup": "abductors",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Single-leg Lying Cross-over Stretch",
    "id": "lying-crossover",
    "muscleGroup": "abductors",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  },
  {
    "name": "Standing Hip Circle",
    "id": "hip-circle",
    "muscleGroup": "abductors",
    "equipmentType": "Body Only",
    "exerciseType": "stretching"
  }
]

const exercisesElement = document.getElementById('exercises')
const elements = document.getElementById('elements')
const slider = document.getElementById('exercise-slider')
const equipmentDropdown = document.getElementById('equipment-dropdown')

const currentBench = document.getElementById('bench-max')
const currentSquat = document.getElementById('squat-max')
const currentDeadlift = document.getElementById('deadlift-max')
const goalBench = document.getElementById('bench-goal')
const goalSquat = document.getElementById('squat-goal')
const goalDeadlift = document.getElementById('deadlift-goal')

groups = []
types = []
equipment = []

for (i = 0; i < exercises.length; i++) {
    exercise = exercises[i]
    if (exercise["muscleGroup"] && !groups.includes(exercise["muscleGroup"])) {
        groups.push(exercise["muscleGroup"])
    }
    if (exercise["exerciseType"] && !types.includes(exercise["exerciseType"]) && exercise["exerciseType"] != "custom") {
        types.push(exercise["exerciseType"])
    }
    if (exercise["equipmentType"] && !equipment.includes(exercise["equipmentType"])) {
      equipment.push(exercise["equipmentType"])
    }
}

{
  for (i = 0; i < equipment.length; i++) {
    type = equipment[i]
    if (type && type != "Body Only" && type != "Other" && type != "None" && type != "Body Weight") {
      option = document.createElement("option")
      option.value = type
      option.selected = true
      option.innerHTML = type
      equipmentDropdown.appendChild(option)
    }
  }
}

y = 10
exerciseCards = []
for (i = 0; i < groups.length; i++) {
    div = document.createElement("div")
    div.className = "exercise-card"

    header = document.createElement("div")
    header.style = "padding: 10px;"
    header.innerHTML = groups[i].substring(0,1).toUpperCase() + groups[i].substring(1) + " Exercise"
    
    div.appendChild(header)
    exercisesElement.appendChild(div)
    exerciseCards.push(div)

    div.addEventListener('mousedown', (e) => {
        if (e.button == 0 && selectedSchedule != undefined) {
            c = document.createElement("div")
            c.className = "exercise-schedule"
             
            txt = document.createElement("div")
            txt.innerHTML = e.target.innerHTML
            txt.className = "movement"
            txt.style = "padding-top: 5px; padding-left: 5px;"
            c.appendChild(txt)

            if (e.target.innerHTML != "Custom Exercise") {
              select = document.createElement("select")
              select.name = "type"
              select.id = "type-dropdown"
              for (j = 0; j < types.length; j++) {
                  option = document.createElement("option")
                  option.value = types[j]
                  option.innerHTML = types[j].substring(0,1).toUpperCase() + types[j].substring(1)
                  select.appendChild(option)
              }
              c.appendChild(select)
            } else {
              inputName = document.createElement("input")
              inputName.type = "text"
              inputName.placeholder = "Name"
              inputName.className = "exercise-name-input"
              c.appendChild(inputName)
            }

            selectedSchedule.parentNode.children[1].appendChild(c)
        }
    })

    y += 50 
}

const { PDFDocument, StandardFonts, rgb } = PDFLib
const weeks = document.getElementById("weeks-long")

pdf = "data:text/plain;base64,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F120Oou88sorZTN7/fXXZ/Wzwhzle274TWXmtyxC37LZsvvuuz/7bIXjDL/99tu+AiB586WXWi3UaHrsUb9my0a1j1h7zSfuvOOm004uj0+mjxz+UJdr2y6xUOt6NVo3rHXMphvde+klA555+rMPPxg18puS9+VV4qeffuq0zZZtmjb4ZVTzfEDVpH7388+tcg3jxo27/LBDpnc4rzv/visu90zPByNCa7NI41b1a954ykln77XH9CfIzBj8vP2qK335ySezt1v4vfjHP/6RL9FGVPrkx+SUU04pKDTPPLPqYP6NN97IL7LZZpvNjezPkT92UX5zzhyuarajqSQOmJKrFU0BeQ/f1LXlgvWmRyANFoggpFWjOkess2arejXbr7z88K+m9z///OOPul9w3jnN9zz2Xxsdu+mG57Zucft5577x8ksFg2pOmTy58gcKR/R1YfsDLtiv7fTHxOSjqV+a/Orcf2XnShYf/NqrHTfeoNViCx214fpdTzxhxFdfxcedttN2qc/8fzehfCvaLrXoGy+9OFf2D79lZ599dr5E69696iH311577YLiMkKyKpe64oor8otcfvnlcyH3c+aPXZTnt+7NN9+ck1XNYTQVSjYHi6aAAn3uuL28hqpGikZ+GXOgXs1O22/z5ksvTZ06tXiRmDhqxIhP33tv0PPP9X/m6UEvvjDkzTeGDx9WScvai488fNDqqzx40437NKqdqqf++xzA9Hrhxo/f1q3ksp99MvT+66556p67h33xRZoSwdKxm2yYDY/wSyg1vVaq5hHrrj24/2tzZc/wG/fOO+/kS7T999+/8vTjxo0rWVxW+UH//ve/8+k/++yzubQFs++PXZTnt24uRlMLLLBAryIPP/zw448//uSTT95///1du3Zt3779kksuWXCEXHvttQWrFU0BxQY88/Th66yZApLpz0FOIzjVq9Gqcd1jm216/Ymd7r3skgeu6nzXuWffePxxF+3b5sL92t102ilP3H3nkIEDvhsxfNLEiQUrnPDjjyO//ur9N994pW/fR7vdenH7A9ots/hNZ5425I3X92lSPx9NZX+djz7qP5ts+Pjtt5WI3spNmTp1+BdfPHXXnWfu8e80PEKrGU/iS9FUxISXHnTAyOHD/te7i9+OfIm23HLLVZ74rrvuKhlN3XnnnZUvWKNGjd9a0flby8/c9b+Lpqq51DHHHFP5oSWaAkoaPWpUjysuO3LdtVtGoJJCqQa1fgmrGtVu1bTBIWutfk6LvW8/56yBTz816ptvChb/+eefv3jvvecffKDbaadefsRhF+zT8rLDDrm+03HdLzz/4VtufuWJPl98NH0MhE8//HCfxcs7YqUhrRrUTC/2XWGZDuut8/qLL5y843bHbdXs1nPPfrjrDS888vDT99/X87prbjz5xIv3a9dxo3+2WXyh6cFenfmmZy8iqIa1WjZtcOBKy5203VbdzzvHYAh/QltuuWX1C7XWrVtnKVdbbbXsdfPmzStZ6quvvsp/xG677TZXt2A2/bGL8nkeTYVDDjkkn42+ffvm54qmgEqMHzv2o7ff6nv3nfdeftkjt97yxO3dXn70kXde6ffV0KE//ji+OP2UKVPe6fdy1xOOO2mHbU/fbeebTjj+mR73DB08eMyoUVNKNRG+9MjDrRvVnv5QmIa1Omy43r5LLjI9pqo7/9Fb/Kv9Kivcd+nFsdQ9l14SAVLrJvWn37vXsNb0Oqjy2Gn62yYNDl3rr6ftvOO1Rx91X+fLn7j7rr739xg65N2SzZH8GVx11VX5Qu3BBx+sJHE+5QMPPJC9rlu3biVLde/ePb/g7bffPpe3Ybb8sYvy30I09f777+ezcfrpp+fniqaAKkX41GGj9a884tCHb77p2QcfeOzWW3reeP13336bTzNhwoSHu95w/Ob/Ovzva9143NHv9n+tOkMo3HnJhRFHXXbk4Yf/bY2Td9wu/qbXU9Wvuf+SC1/b6bijNtlgYnmj4Zjvv3/1qSe7X3JR5yMOi79u55zd64YuLz/26PtvvjFi2NfDvvzynVdfiWjqrL33aLf0Yk8/eP//akfwm/fFF1/kC7UjjjiiopTFxV/+7bvvvlvRggceeGA+5ffff195ln7++efXXnutd+/eN9544yOPPFLNERgqN3bs2Oeff/6VV17JpvyPivL4Ab766qu9evWKzD/66KNvvPHGXFx59f0Woqnwl7/8JVv2gAMOyM+avWhq1KhRAwYMePbZZyNUmytDlsX3NXTo0BdffHFurRCYu24568w2SyzcdunFjvrnujecfMJHb7+Vn/vq448dtcmGHTfZ4PFbb/lh9Ojqr7b/U08+fMvNo78f9Z9/rNVxvbWvPfbo8va+6f2m7rrogtN23vHNF1+oZPGR34y484rLT9hp+/1WWq7lwo0PWmOV3jfeUEnX98mTJ48fP/7HcvlgL16PGzcuAsL0NubG2/w9iV9++eVHH30U09PbqVOnpjSZWG1MjFNZ9npa+SgQ8TY+NN7GxHgdeUsLZp8es+JtnPfUp80tderUyQq11VZbraJk559/fpbsb3/7W0xZc801symVDP7ZuHHjLNlCCy1USU569uy5xx571K5du2xmsYZ///vflQxelPz9739fY4bsgLn33ntXX331tJ6FF144S1zNojwK2R122GHDDTeMPbP44ovHvsoO+wL333//brvtFvFGQeabNGkS0194obIf5rTynZn56qsqHkeVTxw5TBM/++yz9WfIZ2D9nMpXW9KcRFPbbbddtmx8g/lZsxRNxYER30LsyYJ926hRo+bNm0fUWvnia+RkE7t27brTTjsVrHCjjTa69NJLZ2kbgf+177/99vtvRxY89Tjedu103FGbbvTUfT0qGRJhwo/jI8r64fvvx40ZM3lK4chUEWAc8rc1jt9w3cdv79Z6xjOLr+lweP9nnu55y02V5yrikwhTvh0x4uvPPhtX1bVYv379ll9++bjAXGmllaI0ad26dVzHxfQbbrghCqa99tprWnnEteOOOy6yyCI9evSYVh5H7bzzzg0aNIgTbyyY+idH8LPpppsut9xyK5SLFyuvvHKkPPnkk5dccslll1326aefjmRHHHFErLZPnz6jR49eZ511ItngwYOvu+66mPh///d/aYSuWGHTpk0LrnOZE7vvvnt1yrUoibI0N900/TDr0qVLNiXFV8Uiqsmv/MADDyyZLCKBXXbZpawqUbJPLLplI7PUUktlKVM0te++++YXj+I4S1ydTX733XeXXnrpfMoXXywxcsjHH39cXC4Xi8xUMspcPuWwYVXcCZJPnI+mqsxD5astaU6iqS222CJbtmXLlvlZ1Yym7rjjjvyBV5FVV131oYceqmglWbIaNWrE2zir5MO8YptsssmQIUNmaUuBX9OYb0defujBN51y0g8/lHjswo8/jn/54YduOPo/J2+52aGrr3LAissesNxS7Vdc9phmm17Srs09l1z0xgvPj/7uuylTpz565x2tGtW+dL92b/V7+Ze782qXnbH3HjGrb6VB2qx66qmn0ull/vnnTy/S4EIXX3xxvN5ggw2mlUdT6do/lbARSsXrWrVqRXwV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nrulIQuO22KzLscePWb06P1XWq7tSsu3XnKRj3J3AH3z1VcP3Xj9Uw8+kF/DxIkTLzykfURZvW6p4pkas+SLL76oXbt2nGFuu+22CIeaN2/ev3//svJBGtPwjAcccMAnn3wSL4444oi0SERTEXelO/6OOeaYsvL+zNdff33q3hDp4zI/jbx95plnDhgwIF7svffeaW0HHXRQFD3p5r74xAjDysrvftp+++1r1arVrVu3ddddt2HDhlUOaMxsy4LbSgKJihQvePjhh1e+yJFHHplPH2V38aAEF1xwQTa4a1l5s2PB4PzJ3I2mwimnnJJPtuOOOxYkyPfjKiu/M7E4Cjr33HPzN/vH65IjlkSG86taffXV44ojm/v555+nn1KSbyEtGU1tscUWWYK4rnnzzTe/+uqrD4puZqmOedILfZNNNsnPjbNHQYJ77703v42Zli1bFn9WPkGV0VScYbLEoin4fZk0adLRG2/QvGHt53qVD245deoxW252zt57TJky5T8brHfcjtu3WKjR0f/aaEylj2GdVj78Qsdmm57+7xIjJc62119/Pc4qJ5xwwrTyLspt2rRJEc4D5XVoccW95ZZbph7IUSymRaKkW3zxxdOT19LT31Kv2tQXJQ2rOGjQoHh9zjnnpIEfe/XqNa386WPbbLNNlA7p/u64Wk/tGhFxrbHGGquttlqk6dy58yqrrFLwxFjmooI2qRBfSjWXTc+tzit4+EtJxcVis2bN4kiLSGynnXZaeumlC+bmw4y8uR5NhVVXXTWfMh2oefkhT5PYnLZt2x522GGR+YLRq+Iy4YknSox2kuTvJksiellhhRXyD+4Jxx9/fH5LS0ZT+UEDqrmlFZkn0dQzzzxTkPM111wzLsdat24dx0a++rR+/fo333xzPmXsxvXWWy/dcZzk51YZTa2zzjpZYtEU/L4M++LzfZZY5MDVV0kDe0YQdcxmmxy13joRVp29954HrbX6cdtt3bxejRO232ZYVVHE50M/PuH/dvxh7j0XeOTIkU2bNl1xxRW//fbbNKV79+5l5c/FiHxGYVGdaCoNtXf11VeXzSgKBw4cWFYeTUVUVlYem/3888+xVBZNxbX5WmutlRZ59913003rqc0izoeVDzrKnBgzZkxBQVb9MuX8888vWDZ7OlIlIk3Bs2sr0rBhw4cffrii9fwvoqmCKqPixD/++GMa879KTZo0qbzRLS468o8zLik9uCd+HdmUktFUwUMSq7OlFZlXY6HHUVflLt16661T1BRXWwWzZjuayj+6SDQFvy+D+73cvGHtyw5pn005eZst9l9peovArWef2bz+AhcfdMA+izRuXrfGQauv8nyvnpUPtfTCY48O+7KK56TPkvQcmbgGT92JUzR17733RjYqqpuK6ekG9tmLpuIS/pBDDomVHH744WXl0dQbb7wRZ/JGjRoVjCDN/0L+cXJlFYy9WVIUYfkF4zK/+h962WWX5R+YUmy//farfJSG/0U0FdKI/ZnWrVsXp4nfSP6WvWKxkuKe58VGjBix9957l1zDSiutlA0mme8pXTKaChG55TtrVWdLS5qHz+m78847Cyr3Mqusssrll1+epXz++ecLAtHZjqbygZloCn5f+j36yN4L1n/q/v8+BfXU7bZqvmD9kV9/3eeO2yOa6rT1FpcedkiLxnVbL9qkeeN6HTfZoPf1XT55/70JpQaSmjJlSnUqBGZJajjYcMMNY82pJahHjx7/u2gqpnTu3Plv5SKySk/969WrV5zM69at269fv7m7dfxGxBEVx1WrVq0233zztddee7311tthhx3atm178803V+fJjJNyfoXcFn/6Pffc06JFi2bNmmWZb9eu3a233jqsgsc/VSTirljq7LPPjquJgw8+uFOnTgXBYTW3dPz48RG09O7d+/7774/gKqte/n3p1q3bvvvuu9VWW2266aYtW7Y8/vjj+/btW5zs66+/vu+++84888wrrrii4CmNs3RgzNujCJgTz/V8cO+FGr//5pvZlFN33nHvpo2+GDq0f98+ezes3bxh7Tsvvfi4bbZ88r4efbrfcWG7Nkes/4+jNtv0mk7HPfPIw9+P/v5XyGSKiy644ILU06nyuqm4oiyOpuLKuvrR1G233ZaeO1OjRo0UTYVYNqZssMEG2ejxAADhlccf27tJg0/LH3OcnNOm9d6N6n48+J2PBw/ee8H6e9et0bHZv+6+snMEUSPLh3WK66Yfx437acKESRMn/k9Di08//TTCpEGDBk2YMGGhhRbaYostUi/0uNqdVv6I2JiSoqnsUXrjxo2LKCs9KyQuJGNWupmoZDSVBhHq2bNnbEUstfXWW6do6o477khNijVr1hwwYEBEcek5gHvttVdM/Dj3kGgAgHcHDWy+2EKf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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwB/HkCFDOnbsuP766y+00ELzzz9/GQDALIoQIgKJCCciqIjQYl5HN7+2xRdffF5/AwDAH0eEFvM6uvm1DR48+Mgjj1x33XWbNm2qbgoAmA0RQkQgEeFEBBURWszr6AYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABg1owcOfKhhx46//zz99133yOOOOKqq66KKfM6U/PYl19+eemll3br1q2iBD169Ljlllvm+uf279//mSKvv/76zz//XJAyPj3yMNczMHs+/PDDyOewYcPmcD3Dhw+/8cYbO3XqtPvuu3fo0OGKK64YN27crK4k9lVkJvbknORkyJAhsRI/BACqNGHChFNOOaVOnTplM4spEV/N69zNsu+//z5KwCgH53xVsVtiP3Tp0qXk3C+++CLmbrrppnP+QXljx44t/i6SmjVrnn766VlM9cILL8TEffbZZ+5mYLbFroj8REw122uITTvqqKPmm2++gg1v2rRp9+7dZ2lVffv2jQUPPPDA6i/yySefFESD66yzTqwkvuhZ+migwGabbbbEEktstdVW8zoj/xWnmr+W+5U/d80114wPPfzww3/lz+V/LUrkpZdeOoqMrbfe+qqrrupfLl785S9/iYkLLrhgFDHzOo+z5vLLL4+cx/85X9Viiy0Wq5o6der/+oPybr/99lht/OJOz4moIKak0CLihJQyzgbx9sEHH5y7GZg9I0eOXH755eMomu01jBs3bsstt4wtateuXZ8+fSIq+/jjj++///4VVlghJsYBOUtriz2W31fV8e9//zsWef3119PbCKJii2LiLH0uUCyiqfhxbbDBBvM6I/+Vzp/hV/7cRRddND5UNPUHE6FUgwYNFl988bvuuqtgVhSOCy+8cHzp/4uWrP+pVEMy5/UJb7zxRqxno402quSDatasOecNWwVSmX7jjTcWTB87dmwU7jHr4osvTlMiDI6vb8KECXM3A/PKLrvsElt30003FUy/7rrrZvWk9/PPPy9crrhttCKpSnBWYzagOlI0FZeE8zoj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YmoKNiAwIG9iago8PAovRmlsdGVyIC9GbGF0ZURlY29kZQovTGVuZ3RoIDUzCj4+CnN0cmVhbQp4nCvkMrU01TO1MDY0NjYxt1QwAEILEyM9YzNzUwsDE3NTsEhyLpd+hIGCSz5XIBcAADMKGgplbmRzdHJlYW0KZW5kb2JqCjQgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL01lZGlhQm94IFswIDAgNTk1LjU4MzEzMzQ3OSA4NDIuMzY3NTgwNDc1XQovUmVzb3VyY2VzIDw8Ci9YT2JqZWN0IDw8Ci9YMCAzIDAgUgo+Pgo+PgovQ29udGVudHMgNiAwIFIKL1BhcmVudCAyIDAgUgo+PgplbmRvYmoKMiAwIG9iago8PAovVHlwZSAvUGFnZXMKL0tpZHMgWzQgMCBSXQovQ291bnQgMQo+PgplbmRvYmoKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjcgMCBvYmoKPDwKL0NyZWF0b3IgKDMtSGVpZ2h0c1wyMjIgSW1hZ2UgdG8gUERGIENvbnZlcnRlciA2LjE2LjAuMiBcKHd3dy5wZGYtdG9vbHMuY29tXCkpCi9Nb2REYXRlIChEOjIwMjQwNTI1MDA0NzM2KzAyJzAwJykKL0NyZWF0aW9uRGF0ZSAoRDoyMDI0MDUyNTAwNDczNiswMicwMCcpCi9Qcm9kdWNlciAoMy1IZWlnaHRzXDIyMiBJbWFnZSB0byBQREYgQ29udmVydGVyIFNoZWxsIDYuMTYuMC4yIFwoaHR0cDovL3d3dy5wZGYtdG9vbHMuY29tXCkpCj4+CmVuZG9iagp4cmVmCjAgOAowMDAwMDAwMDAwIDY1NTM1IGYNCjAwMDAwMjU1MzMgMDAwMDAgbg0KMDAwMDAyNTQ3NiAwMDAwMCBuDQowMDAwMDAwMDE1IDAwMDAwIG4NCjAwMDAwMjUzMjcgMDAwMDAgbg0KMDAwMDAyNTE4MiAwMDAwMCBuDQowMDAwMDI1MjAzIDAwMDAwIG4NCjAwMDAwMjU1ODIgMDAwMDAgbg0KdHJhaWxlcgo8PAovU2l6ZSA4Ci9Sb290IDEgMCBSCi9JbmZvIDcgMCBSCi9JRCBbPDIyQ0EzQzY4NkUwODc4MkZGNkY0NDRBRTZBQzUxMjQ3PiA8QTE1NTUzODUwMEExQkE2MEI4MzMzNjUxRjYyMDNBOEE+XQo+PgpzdGFydHhyZWYKMjU4NTAKJSVFT0YK"

async function generate() {
  weeksLong = 6
  if (weeks.value) {
    input = parseInt(weeks.value)
    if (input) {
      weeksLong = input
    }
  }
  bench = {}
  deadlift = {}
  squat = {}

  if (currentBench.value && goalBench.value) {
    current = parseInt(currentBench.value)
    goal = parseInt(goalBench.value)
    if (current && goal) {
      bench["current"] = current
      bench["goal"] = goal
    }
  }
  if (currentSquat.value && goalSquat.value) {
    current = parseInt(currentSquat.value)
    goal = parseInt(goalSquat.value)
    if (current && goal) {
      squat["current"] = current
      squat["goal"] = goal
    }
  }
  if (currentDeadlift.value && goalDeadlift.value) {
    current = parseInt(currentDeadlift.value)
    goal = parseInt(goalDeadlift.value)
    if (current && goal) {
      deadlift["current"] = current
      deadlift["goal"] = goal
    }
  }

  pdfBytes = await fetch(pdf).then((res) => {
    return res.arrayBuffer()
  })

  src = await PDFDocument.load(pdfBytes)
  doc = await PDFDocument.load(pdfBytes)
  font = await doc.embedFont(StandardFonts.Helvetica)
  fontBold = await doc.embedFont(StandardFonts.HelveticaBold)

  today = new Date();
  dd = String(today.getDate()).padStart(2, '0');
  mm = String(today.getMonth() + 1).padStart(2, '0');
  yyyy = today.getFullYear();
  today = mm + '/' + dd + '/' + yyyy
  
  page = doc.getPage(0)
  page.drawText("Created on " + today, {
    x: 45,
    y: 740,
    size: 18,
    font: font,
    color: rgb(0,0,0)
  })

  y = 660

  for (k = 0; k < weeksLong; k++) {
    program = {}
    for (i = 0; i < scheduleCards.length; i++) {
      card = scheduleCards[i]
      header = undefined
      content = undefined
      movements = []
      for (j = 0; j < card.childNodes.length; j++) {
        element = card.childNodes[j]
        if (element && element.id) {
          if (element.id == "header") {
            header = element
          } else if (element.id == "content") {
            content = element
          }
        }
      }
      for (j = 0; j < content.childNodes.length; j++) {
        exercise = content.childNodes[j]
        if (exercise && exercise.className == "exercise-schedule") {
          movement = undefined
          type = undefined
          for (x = 0; x < exercise.childNodes.length; x++) {
            cNode = exercise.childNodes[x]
            if (cNode) {
              if (cNode.className == "movement") {
                movement = cNode.innerHTML
              } else if (cNode.id == "type-dropdown") {
                type = cNode.value
              } else if (cNode.className == "exercise-name-input") {
                type = cNode.value
              }
            }
          }
          group = movement.split(" ")[0].toLowerCase()
          if (movement != "Custom Exercise") {
            possibilities = []
            for (z = 0; z < exercises.length; z++) {
              element = exercises[z]
              if (element["exerciseType"] == type) {
                if (element["muscleGroup"] == group) {
                  if (element["equipmentType"] == "Body Only" || element["equipmentType"] == "Other" && element["equipmentType"] == "None" && element["equipmentType"] == "Body Weight") {
                    possibilities.push(element)
                  } else {
                    for (index in equipmentDropdown.selectedOptions) {
                      option = equipmentDropdown.selectedOptions[index]
                      if (option.innerHTML == element["equipmentType"]) {
                        possibilities.push(element)
                        break
                      }
                    }
                  }
                }
              }
            }
            if (possibilities.length > 0) {
              random = possibilities[Math.floor(Math.random() * possibilities.length)]
              movements.push(random)
            }
          } else {
            movements.push({
              "name": type ? type : "Custom",
              "exerciseType": "custom"
            })
          }
        }
      }
      if (movements && movements.length > 0) {
        program[header.childNodes[1].innerHTML] = movements 
      }
    }

    dayIndex = 0
    for (day in program) {
      movements = program[day]
      fit = Math.floor((dayIndex / Object.keys(program).length) * 3)
      for (j = 0; j < movements.length; j++) {
        movement = movements[j] 
        if (movement["exerciseType"] == "cardio") {
          if (fit == 0) {
            movement["reps"] = "3"
            movement["weight"] = "5 min"
          } else if (fit == 1) {
            movement["reps"] = "3"
            movement["weight"] = "8 min"
          } else if (fit == 2) {
            movement["reps"] = "1"
            movement["weight"] = "15 min"
          }
        } else if (movement["exerciseType"] == "strength") {
          if (fit == 0) {
            movement["reps"] = "8"
            movement["weight"] = "Intense Weight"
          } else if (fit == 1) {
            movement["reps"] = "10"
            movement["weight"] = "Moderate Weight"
          } else if (fit == 2) {
            movement["reps"] = "12"
            movement["weight"] = "Light Weight"
          }
        } else if (movement["exerciseType"] == "plyometrics") {
          if (fit == 0) {
            movement["reps"] = "12"
          } else if (fit == 1) {
            movement["reps"] = "10"
          } else if (fit == 2) {
            movement["reps"] = "8"
          }
        } else if (movement["exerciseType"] == "stretching") {
          if (fit == 0) {
            movement["reps"] = "3"
            movement["weight"] = "30 sec"
          } else if (fit == 1) {
            movement["reps"] = "3"
            movement["weight"] = "30 sec"
          } else if (fit == 2) {
            movement["reps"] = "3"
            movement["weight"] = "30 sec"
          }
        }
      }
      dayIndex += 1
    }
    
    if (Object.keys(bench).length > 0 || Object.keys(squat).length > 0 || Object.keys(deadlift).length > 0) {
      if (k + 1 < weeksLong && (k + 1) % 2 == 0) {
        lifts = []
        if (Object.keys(bench).length > 0) {
          perfectWeight = bench["current"] + ((k / weeksLong) * (bench["goal"] - bench["current"]))
          inPlatesWeight = 0
          sizes = [45,25,10,5]
          for (size in sizes) {
            val = sizes[size]
            while (inPlatesWeight < perfectWeight - 45) {
              inPlatesWeight += val * 2
              if (inPlatesWeight > perfectWeight - 45) {
                  inPlatesWeight -= val * 2
                  break
              }
            }
          }
          inPlatesWeight += 45
          lifts.push({
            "name": "Bench Press",
            "reps": "1",
            "weight": (inPlatesWeight + " lbs"),
            "exerciseType": "benchmark"
          })
        }
        if (Object.keys(squat).length > 0) {
          perfectWeight = squat["current"] + ((k / weeksLong) * (squat["goal"] - squat["current"]))
          inPlatesWeight = 0
          sizes = [45,25,10,5]
          for (size in sizes) {
            val = sizes[size]
            while (inPlatesWeight < perfectWeight - 45) {
              inPlatesWeight += val * 2
              if (inPlatesWeight > perfectWeight - 45) {
                  inPlatesWeight -= val * 2
                  break
              }
            }
          }
          inPlatesWeight += 45
          lifts.push({
            "name": "Squat",
            "reps": "1",
            "weight": (inPlatesWeight + " lbs"),
            "exerciseType": "benchmark"
          })
        }
        if (Object.keys(deadlift).length > 0) {
          perfectWeight = deadlift["current"] + ((k / weeksLong) * (deadlift["goal"] - deadlift["current"]))
          inPlatesWeight = 0
          sizes = [45,25,10,5]
          for (size in sizes) {
            val = sizes[size]
            while (inPlatesWeight < perfectWeight - 45) {
              inPlatesWeight += val * 2
              if (inPlatesWeight > perfectWeight - 45) {
                  inPlatesWeight -= val * 2
                  break
              }
            }
          }
          inPlatesWeight += 45
          lifts.push({
            "name": "Deadlift",
            "reps": "1",
            "weight": (inPlatesWeight + " lbs"),
            "exerciseType": "benchmark"
          })
        }
        program["Benchmark"] = lifts
      } else if (k + 1 == weeksLong) {
        lifts = []
        if (Object.keys(bench).length > 0) {
          lifts.push({
            "name": "Bench Press",
            "reps": "1",
            "weight": (bench["goal"] + " lbs"),
            "exerciseType": "benchmark"
          })
        }
        if (Object.keys(squat).length > 0) {
          lifts.push({
            "name": "Squat",
            "reps": "1",
            "weight": (squat["goal"] + " lbs"),
            "exerciseType": "benchmark"
          })
        }
        if (Object.keys(deadlift).length > 0) {
          lifts.push({
            "name": "Deadlift",
            "reps": "1",
            "weight": (deadlift["goal"] + " lbs"),
            "exerciseType": "benchmark"
          })
        }
        program["Final"] = lifts
      }
    }
    
    if (k > 0) {
      y = 660
      copy = await doc.copyPages(src, [0])
      doc.addPage(copy[0])
      page = copy[0]
    }

    async function checkForNewPage(height) {
      if (y - height < 105) {
        y = 660
        copy = await doc.copyPages(src, [0])
        doc.addPage(copy[0])
        page = copy[0]
      }
    }

    await checkForNewPage(15 + 17)
    page.drawText("Week " + (k + 1), {
      x: 270,
      y: y,
      size: 15,
      font: fontBold,
      color: rgb(0,0,0)
    })
    y -= 17
    for (day in program) {
      movements = program[day]
      bold = day == "Benchmark" || day == "Final"
      await checkForNewPage(9 + 9 + 10 + 7 + 17 + 10 + 22)
      page.drawText(day + ":", {
        x: 150,
        y: y,
        size: 9,
        font: bold ? fontBold : font,
        color: rgb(0,0,0)
      })
      for (i = 0; i < movements.length; i++) {
        exercise = movements[i]
        type = exercise["exerciseType"]
        page.drawText(exercise ? exercise["name"] : "null", {
          x: 250,
          y: y,
          size: 9,
          font: bold ? fontBold : font,
          color: rgb(0,0,0)
        })
        page.drawText(((exercise && exercise["reps"]) ? exercise["reps"] : ""), {
          x: 260 + ((exercise ? exercise["name"] : "null").length * 4.5),
          y: y,
          size: 9,
          font: bold ? fontBold : font,
          color: rgb(0,0,0)
        })
        if (type != "plyometrics" && type != "custom") {
          page.drawText("x " + (exercise ? exercise["weight"] : "null"), {
            x: 271 + ((exercise ? exercise["name"] : "null").length * 4.5),
            y: y,
            size: 9,
            font: bold ? fontBold : font,
            color: rgb(0,0,0)
          })
        }
        y -= 8
        page.drawText(type.substring(0,1).toUpperCase() + type.substring(1), {
          x: 260,
          y: y,
          size: 7,
          font: bold ? fontBold : font,
          color: rgb(0,0,0)
        })
        if (type != "benchmark" && type != "custom") {
          page.drawText("Ref:", {
            x: 305,
            y: y,
            size: 7,
            font: font,
            color: rgb(0,0,0)
          })
          if (exercise) {
            page.drawText("www.bodybuilding.com/exercises/" + exercise["id"], {
              x: 322,
              y: y,
              size: 7,
              font: font,
              color: rgb(0.3,0.3,1)
            })
          }
        }
        y -= 17
      }
      y -= 10
    }
    y -= 22
  }

  await doc.save()
  pdfUri = await doc.saveAsBase64({ dataUri: true })
  
  download(pdfUri, "workoutplan_PhoenixSolutions.pdf", "text/plain")
}