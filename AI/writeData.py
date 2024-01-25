from random import uniform, randrange

with open('data.csv', 'w') as f:
    for i in range(300):
        last_rast = round(uniform(1, 150), 1)
        if last_rast > 100:
            last_speed = round(uniform(20, 30), 1)
            last_pulse = round(uniform(140, 170), 1)
        elif 50 <= last_rast <= 100:
            last_speed = round(uniform(15, 20), 1)
            last_pulse = round(uniform(110, 139), 1)
        else:
            last_speed = round(uniform(10, 15), 1)
            last_pulse = round(uniform(65, 100), 1)
        target_rast = round(uniform(1, 150), 1)
        if target_rast > 100:
            target_time = round(uniform(7, 9), 1)
        elif 50 <= target_rast <= 100:
            target_time = round(uniform(4, 6), 1)
        elif 20 <= target_rast < 50:
            target_time = round(uniform(2, 4), 1)
        else:
            target_time = round(uniform(1, 2), 1)

        f.write(f'{last_rast};{last_speed};{last_pulse};{target_rast};{target_time};\n')