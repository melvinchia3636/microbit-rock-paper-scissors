def unixTimeToHumanReadable(seconds):
    
    # Save the time in Human
    # readable format
    ans = ""
    
    # Number of days in month
    # in normal year
    daysOfMonth = [ 31, 28, 31, 30, 31, 30,
                    31, 31, 30, 31, 30, 31 ]
  
    (currYear, daysTillNow, extraTime,
     extraDays, index, date, month, hours,
     minutes, secondss, flag) = ( 0, 0, 0, 0, 0,
                                  0, 0, 0, 0, 0, 0 )
  
    # Calculate total days unix time T
    daysTillNow = seconds // (24 * 60 * 60)
    extraTime = seconds % (24 * 60 * 60)
    currYear = 1970
    
    # Calculating currrent year
    while (daysTillNow >= 365):
        if (currYear % 400 == 0 or
           (currYear % 4 == 0 and
            currYear % 100 != 0)):
                daysTillNow -= 366
         
        else:
            daysTillNow -= 365
         
        currYear += 1
         
    # Updating extradays because it
    # will give days till previous day
    # and we have include current day
    extraDays = daysTillNow + 1
    
    if (currYear % 400 == 0 or
       (currYear % 4 == 0 and
        currYear % 100 != 0)):
            flag = 1
  
    # Calculating MONTH and DATE
    month = 0
    index = 0
    
    if (flag == 1):
        while (True):
            
            if (index == 1):
                if (extraDays - 29 < 0):
                    break
                 
                month += 1
                extraDays -= 29
             
            else:
                if (extraDays - daysOfMonth[index] < 0):
                    break
                 
                month += 1
                extraDays -= daysOfMonth[index]
             
            index += 1
         
    else:
        while (True):
            if (extraDays - daysOfMonth[index] < 0):
                break
             
            month += 1
            extraDays -= daysOfMonth[index]
            index += 1
  
    # Current Month
    if (extraDays > 0):
        month += 1
        date = extraDays
     
    else:
        if (month == 2 and flag == 1):
            date = 29
        else:
            date = daysOfMonth[month - 1]
 
    # Calculating HH:MM:YYYY
    hours = extraTime // 3600
    minutes = (extraTime % 3600) // 60
    secondss = (extraTime % 3600) % 60
    
    ans += str(date)
    ans += "/"
    ans += str(month)
    ans += "/"
    ans += str(currYear)
    ans += " "
    ans += str(hours)
    ans += ":"
    ans += str(minutes)
    ans += ":"
    ans += str(secondss)
    
    # Return the time
    return ans
 
# Given unix time
T = 1595497956

# Function call to convert unix
# time to human read able
ans = unixTimeToHumanReadable(T)

# Print time in format
# DD:MM:YYYY:HH:MM:SS
print(ans)

def startGame():
    music.play_melody("F D F A G E C G ", 120)
# on Button A clicked callback

def on_button_pressed_a():
    global curr_num
    curr_num = randint(0, 2)
    draw(curr_num)
input.on_button_pressed(Button.A, on_button_pressed_a)

# function for rendering results on screen
def draw(index: number):
    global curr_icon
    curr_icon = char_icon[index]
    curr_icon.show_image(0)
    showText(char_name[index])
# show text and play some nmice
def showText(text: str):
    music.play_melody("C5 B C5 E C5 C B C5 ", 300)
    basic.pause(500)
    for t in text:
        music.play_tone(523, music.beat(BeatFraction.EIGHTH))
        basic.show_string("" + (t))
        basic.clear_screen()
        basic.pause(50)
curr_icon: Image = None
curr_num = 0
char_icon: List[Image] = []
char_name: List[str] = []
char_name = ["paper", "scissors", "stone"]
char_icon = [images.icon_image(IconNames.SQUARE),
    images.icon_image(IconNames.SCISSORS),
    images.icon_image(IconNames.SMALL_SQUARE)]
music.set_built_in_speaker_enabled(True)
startGame()