/* eslint-disable */
class List {
  /** Иконка Pointing_hand */
  POINTING_HAND = require("Icons/pointing_hand.svg").default;
  /** Иконка прямой стрелки вниз влево */
  ST_DOWN_LEFT = require("Icons/st_down_left.svg").default;
  /** Иконка прямой стрелки вниз вправо */
  ST_DOWN_RIGHT = require("Icons/st_down_right.svg").default;
  /** Иконка прямой стрелки вниз */
  ST_DOWN = require("Icons/st_down.svg").default;
  /** Иконка прямой стрелки лево */
  ST_LEFT = require("Icons/st_left.svg").default;
  /** Иконка прямой стрелки вправо */
  ST_RIGHT = require("Icons/st_right.svg").default;
  /** Иконка прямой стрелки вверх влево */
  ST_UP_LEFT = require("Icons/st_up_left.svg").default;
  /** Иконка прямой стрелки вверх вправо */
  ST_UP_RIGHT = require("Icons/st_up_right.svg").default;
  /** Иконка прямой стрелки вверх */
  ST_UP = require("Icons/st_up.svg").default;
  /** Иконка вниз в кругу */
  DOWN = require("Icons/down.svg").default;
  /** Иконка влево в кругу */
  CIRCLE_LEFT = require("Icons/circle_left.svg").default;
  /** Иконка вправо в кругу */
  CIRCLE_RIGHT = require("Icons/circle_right.svg").default;
  /** Иконка вверх в кругу */
  CIRCLE_UP = require("Icons/circle_up.svg").default;
  /** Иконка chevron_down */
  CHEVRON_DOWN = require("Icons/chevron_down.svg").default;
  /** Иконка < */
  CHEVRON_LEFT = require("Icons/chevron_left.svg").default;
  /** Иконка > */
  CHEVRON_RIGHT = require("Icons/chevron_right.svg").default;
  /** Иконка chevron_up */
  CHEVRON_UP = require("Icons/chevron_up.svg").default;
  /** Иконка double_down */
  DOUBLE_DOWN = require("Icons/double_down.svg").default;
  /** Иконка double_left */
  DOUBLE_LEFT = require("Icons/double_left.svg").default;
  /** Иконка Иконка double_right */
  DOUBLE_RIGHT = require("Icons/double_right.svg").default;
  /** Иконка double_up */
  DOUBLE_UP = require("Icons/double_up.svg").default;
  /** Иконка сортировки */
  SORT = require("Icons/sort.svg").default;
  /** Иконка угловой стрелки вниз влево */
  C_DOWN_LEFT = require("Icons/c_down_left.svg").default;
  /** Иконка угловой стрелки вниз вправо */
  C_DOWN_RIGHT = require("Icons/c_down_right.svg").default;
  /** Иконка угловой стрелки справа вниз */
  C_LEFT_DOWN = require("Icons/c_left_down.svg").default;
  /** Иконка угловой стрелки справа вверх */
  C_LEFT_UP = require("Icons/c_left_up.svg").default;
  /** Иконка угловой стрелки слева вниз */
  C_RIGHT_DOWN = require("Icons/c_right_down.svg").default;
  /** Иконка угловой стрелки слева вверх */
  C_RIGHT_UP = require("Icons/c_right_up.svg").default;
  /** Иконка угловой стрелки вверх влево */
  C_UP_LEFT = require("Icons/c_up_left.svg").default;
  /** Иконка угловой стрелки вверх вправо */
  C_UP_RIGHT = require("Icons/c_up_right.svg").default;
  /** Иконка log_in */
  LOG_IN = require("Icons/log_in.svg").default;
  /** Иконка log_out */
  LOG_OUT = require("Icons/log_out.svg").default;
  /** Иконка макс размер */
  MAXIMIZE = require("Icons/maximize.svg").default;
  /** Иконка свернуть */
  MINIMIZE = require("Icons/minimize.svg").default;
  /** Иконка move */
  MOVE = require("Icons/move.svg").default;
  /** Иконка refresh_left */
  REFRESH_LEFT = require("Icons/refresh_left.svg").default;
  /** Иконка refresh_right */
  REFRESH_RIGHT = require("Icons/refresh_right.svg").default;
  /** Иконка повтора */
  REPEAT = require("Icons/repeat.svg").default;
  /** Иконка rotation_left */
  ROTATION_LEFT = require("Icons/rotation_left.svg").default;
  /** Иконка rotation_right */
  ROTATION_RIGHT = require("Icons/rotation_right.svg").default;
  /** Иконка shuffle */
  SHUFFLE = require("Icons/shuffle.svg").default;
  /** Иконка trending_down */
  TRENDING_DOWN = require("Icons/trending_down.svg").default;
  /** Иконка trending_up */
  TRENDING_UP = require("Icons/trending_up.svg").default;
  /** Иконка forward_right */
  FORWARD_RIGHT = require("Icons/forward_right.svg").default;
  /** Иконка паузы в кругу */
  CIRCLE_PAUSE = require("Icons/circle_pause.svg").default;
  /** Иконка паузы */
  PAUSE = require("Icons/pause.svg").default;
  /** Иконка play в кругу */
  CIRCLE_PLAY = require("Icons/circle_play.svg").default;
  /**  */
  PLAY = require("Icons/play.svg").default;
  /** Иконка назад */
  BACK = require("Icons/back.svg").default;
  /** Иконка forward */
  FORWARD = require("Icons/forward.svg").default;
  /** Иконка forward_left */
  FORWARD_LEFT = require("Icons/forward_left.svg").default;
  /** Иконка мин размер 2 */
  MINIMIZE_2 = require("Icons/minimize_2.svg").default;
  /** Иконка звук на мин. */
  LEVEL_LOW = require("Icons/level_low.svg").default;
  /** Иконка звук на макс. */
  LEVEL_FULL = require("Icons/level_full.svg").default;
  /** Иконка отключить звук */
  MUTE = require("Icons/mute.svg").default;
  /** Иконка звука на нуле */
  LEVEL_OFF = require("Icons/level_off.svg").default;
  /** Иконка align_center */
  ALIGN_CENTER = require("Icons/align_center.svg").default;
  /** Иконка align_justify */
  ALIGN_JUSTIFY = require("Icons/align_justify.svg").default;
  /** Иконка align_left */
  ALIGN_LEFT = require("Icons/align_left.svg").default;
  /** Иконка align_right */
  ALIGN_RIGHT = require("Icons/align_right.svg").default;
  /** Иконка жирного текста */
  BOLD = require("Icons/bold.svg").default;
  /** Иконка курсива */
  ITALIC = require("Icons/italic.svg").default;
  /** Иконка редактирование формы */
  EDIT_FORM = require("Icons/edit_form.svg").default;
  /** Иконка link */
  LINK = require("Icons/link.svg").default;
  /** Иконка link 2 */
  LINK_2 = require("Icons/link_2.svg").default;
  /** Иконка лист */
  LIST = require("Icons/list.svg").default;
  /** Иконка attachment */
  ATTACHMENT = require("Icons/attachment.svg").default;
  /** Иконка pen_tool */
  PEN_TOOL = require("Icons/pen_tool.svg").default;
  /** Иконка scissors_tool */
  SCISSORS_TOOL = require("Icons/scissors_tool.svg").default;
  /** Иконка подчеркнутый текст */
  UNDERLINE = require("Icons/underline.svg").default;
  /** Иконка type */
  TYPE = require("Icons/type.svg").default;
  /** Иконка макс размер 2 */
  MAXIMIZE_2 = require("Icons/maximize_2.svg").default;
  /** Иконка копирования */
  COPY = require("Icons/copy.svg").default;
  /** Иконка редактирования */
  EDIT = require("Icons/edit.svg").default;
  /** Иконка highlight */
  HIGHLIGHT = require("Icons/highlight.svg").default;
  /** Иконка сохранить */
  SAVE = require("Icons/save.svg").default;
  /** Иконка увеличить */
  ZOOM_IN = require("Icons/zoom_in.svg").default;
  /** Иконка уменьшить */
  ZOOM_OUT = require("Icons/zoom_out.svg").default;
  /** Иконка ! в круге */
  CIRCLE_EXC = require("Icons/circle_exc.svg").default;
  /** Иконка ! в онтагоне */
  OCTAGON_EXC = require("Icons/octagon_exc.svg").default;
  /** Иконка ! в треугольнике */
  TRIANGLE_EXC = require("Icons/triangle_exc.svg").default;
  /** Иконка чека в круге */
  CIRCLE_CHECK = require("Icons/circle_check.svg").default;
  /** Иконка чека в рамке */
  SQUARE_CHECK = require("Icons/square_check.svg").default;
  /** Иконка минуса в круге */
  CIRCLE_MINUS = require("Icons/circle_minus.svg").default;
  /** Иконка минуса в рамке */
  SQUARE_MINUS = require("Icons/square_minus.svg").default;
  /** Иконка плюса в круге */
  CIRCLE_PLUS = require("Icons/circle_plus.svg").default;
  /** Иконка плюса в рамке */
  SQUARE_PLUS = require("Icons/square_plus.svg").default;
  /** Иконка close в круге */
  CIRCLE_CLOSE = require("Icons/circle_close.svg").default;
  /** Иконка close в онтагоне */
  OCTAGON_CLOSE = require("Icons/octagon_close.svg").default;
  /** Иконка close в рамке */
  SQUARE_CLOSE = require("Icons/square_close.svg").default;
  /** Иконка чек */
  CHECK = require("Icons/check.svg").default;
  /** Иконка минус */
  MINUS = require("Icons/minus.svg").default;
  /**  Иконка плюс */
  PLUS = require("Icons/plus.svg").default;
  /** Иконка стоп */
  STOP = require("Icons/stop.svg").default;
  /** Иконка close */
  CLOSE = require("Icons/close.svg").default;
  /** Иконка вопроса в круге */
  CIRCLE_QUESTION = require("Icons/circle_question.svg").default;
  /** Иконка стоп в кругу */
  CIRCLE_STOP = require("Icons/circle_stop.svg").default;
  /** Иконка диска */
  DISC = require("Icons/disc.svg").default;
  /** Иконка наушников */
  HEADPHONES = require("Icons/headphones.svg").default;
  /** Иконка музыки */
  MUSIC = require("Icons/music.svg").default;
  /** Иконка speaker */
  SPEAKER = require("Icons/speaker.svg").default;
  /** Иконка action_stop */
  ACTION_STOP = require("Icons/action_stop.svg").default;
  /** Иконка activity */
  ACTIVITY = require("Icons/activity.svg").default;
  /** Иконка anchor */
  ANCHOR = require("Icons/anchor.svg").default;
  /** Иконка архива */
  ARCHIVE = require("Icons/archive.svg").default;
  /** Иконка at_sign */
  AT_SIGN = require("Icons/at_sign.svg").default;
  /** Иконка award */
  AWARD = require("Icons/award.svg").default;
  /** Иконка bar_chart */
  BAR_CHART = require("Icons/bar_chart.svg").default;
  /** Иконка bar_chart_2 */
  BAR_CHART_2 = require("Icons/bar_chart_2.svg").default;
  /** Иконка зарядка батареи */
  BATTERY_CHARGING = require("Icons/battery_charging.svg").default;
  /** Иконка battery_def */
  BATTERY_DEF = require("Icons/battery_def.svg").default;
  /** Иконка выключить уведомления */
  NOTIFICATION_OFF = require("Icons/notification_off.svg").default;
  /** Иконка включить уведомления */
  NOTIFICATION_ON = require("Icons/notification_on.svg").default;
  /** Иконка bluetooth */
  BLUETOOTH = require("Icons/bluetooth.svg").default;
  /** Иконка открытой книги */
  BOOK_OPEN = require("Icons/book_open.svg").default;
  /** Иконка книги  */
  BOOK = require("Icons/book.svg").default;
  /** Иконка bookmark */
  BOOKMARK = require("Icons/bookmark.svg").default;
  /** Иконка куба */
  BOX = require("Icons/box.svg").default;
  /** Иконка briefcase */
  BRIEFCASE = require("Icons/briefcase.svg").default;
  /** Иконка календаря */
  CALENDAR = require("Icons/calendar.svg").default;
  /** Иконка camera_off */
  CAMERA_OFF = require("Icons/camera_off.svg").default;
  /** Иконка camera_on */
  CAMERA_ON = require("Icons/camera_on.svg").default;
  /** Иконка пустого онтагона */
  OCTAGON_EMPTY = require("Icons/octagon_empty.svg").default;
  /** Иконка пустого треугольника */
  TRIANGLE_EMPTY = require("Icons/triangle_empty.svg").default;
  /** Иконка пустого круга */
  EMPTY = require("Icons/empty.svg").default;
  /** Иконка пустой рамки */
  SQUARE_EMPTY = require("Icons/square_empty.svg").default;
  /** Иконка pie_chart */
  PIE_CHART = require("Icons/pie_chart.svg").default;
  /** Иконка chrome */
  CHROME = require("Icons/chrome.svg").default;
  /** Иконка clipboard */
  CLIPBOARD = require("Icons/clipboard.svg").default;
  /** Иконка часов */
  CLOCK = require("Icons/clock.svg").default;
  /** Иконка code */
  CODE = require("Icons/code.svg").default;
  /** Иконка codepen */
  CODEPEN = require("Icons/codepen.svg").default;
  /** Иконка codesandbox */
  CODESANDBOX = require("Icons/codesandbox.svg").default;
  /** Иконка кофе */
  COFFEE = require("Icons/coffee.svg").default;
  /** Иконка колонок */
  COLUMNS = require("Icons/columns.svg").default;
  /** Иконка command */
  COMMAND = require("Icons/command.svg").default;
  /** Иконка cpu */
  CPU = require("Icons/cpu.svg").default;
  /** Иконка кредитной карточки */
  CREDIT_CARD = require("Icons/credit_card.svg").default;
  /** Иконка кроп */
  CROP = require("Icons/crop.svg").default;
  /** Иконка database */
  DATABASE = require("Icons/database.svg").default;
  /** Иконка backspace */
  BACKSPACE = require("Icons/backspace.svg").default;
  /** Иконка доллар */
  DOLLAR_SIGN = require("Icons/dollar_sign.svg").default;
  /** Иконка скачать с облака */
  DOWNLOAD_CLOUD = require("Icons/download_cloud.svg").default;
  /** Иконка скачать */
  DOWNLOAD = require("Icons/download.svg").default;
  /** Иконка капелька */
  DROPLET = require("Icons/droplet.svg").default;
  /** Иконка eye_of */
  EYE_OFF = require("Icons/eye_off.svg").default;
  /** Иконка eye_on */
  EYE_ON = require("Icons/eye_on.svg").default;
  /** Иконка facebook */
  FACEBOOK = require("Icons/facebook.svg").default;
  /** Иконка feather */
  FEATHER = require("Icons/feather.svg").default;
  /** Иконка фильтра */
  FILTER = require("Icons/filter.svg").default;
  /** Иконка file_minus */
  FILE_MINUS = require("Icons/file_minus.svg").default;
  /** Иконка file_plus */
  FILE_PLUS = require("Icons/file_plus.svg").default;
  /** Иконка file_text */
  FILE_TEXT = require("Icons/file_text.svg").default;
  /**  */
  FILE = require("Icons/file.svg").default;
  /** Иконка папка минус */
  FOLDER_MINUS = require("Icons/folder_minus.svg").default;
  /** Иконка папка плюс */
  FOLDER_PLUS = require("Icons/folder_plus.svg").default;
  /**  */
  FOLDER = require("Icons/folder.svg").default;
  /** Иконка gift */
  GIFT = require("Icons/gift.svg").default;
  /** Иконка git_branch */
  GIT_BRANCH = require("Icons/git_branch.svg").default;
  /** Иконка git_commit */
  GIT_COMMIT = require("Icons/git_commit.svg").default;
  /** Иконка git_merge */
  GIT_MERGE = require("Icons/git_merge.svg").default;
  /** Иконка git_pull */
  GIT_PULL = require("Icons/git_pull.svg").default;
  /** Иконка сетки */
  GRID = require("Icons/grid.svg").default;
  /** Иконка hard_drive */
  HARD_DRIVE = require("Icons/hard_drive.svg").default;
  /** Иконка хэш */
  HASH = require("Icons/hash.svg").default;
  /** Икона сердечка */
  HEART = require("Icons/heart.svg").default;
  /** Иконка изображения */
  IMAGE = require("Icons/image.svg").default;
  /** Иконка inbox */
  INBOX = require("Icons/inbox.svg").default;
  /** Иконка instagram */
  INSTAGRAM = require("Icons/instagram.svg").default;
  /** Иконка ключ */
  KEY = require("Icons/key.svg").default;
  /** Иконка layers */
  LAYERS = require("Icons/layers.svg").default;
  /** Иконка layout */
  LAYOUT = require("Icons/layout.svg").default;
  /** Иконка life_buoy */
  LIFE_BUOY = require("Icons/life_buoy.svg").default;
  /** иконка linkedin */
  LINKEDIN = require("Icons/linkedin.svg").default;
  /** Иконка loader */
  LOADER = require("Icons/loader.svg").default;
  /** Иконка закрытого замка */
  LOCKED = require("Icons/locked.svg").default;
  /** Иконка mail */
  MAIL = require("Icons/mail.svg").default;
  /** Иконка меню */
  MENU = require("Icons/menu.svg").default;
  /** message_box_circle */
  CIRCLE_MESSAGE_BOX = require("Icons/circle_message_box.svg").default;
  /**  */
  MESSAGE_BOX = require("Icons/message_box.svg").default;
  /** Иконка микрофон выключить */
  MIC_OFF = require("Icons/mic_off.svg").default;
  /** Иконка микрофон включить */
  MIC_ON = require("Icons/mic_on.svg").default;
  /** Иконка  more_horizontal */
  MORE_HORIZONTAL = require("Icons/more_horizontal.svg").default;
  /** Иконка more_vertical */
  MORE_VERTICAL = require("Icons/more_vertical.svg").default;
  /** Иконка mouse_pointer */
  MOUSE_POINTER = require("Icons/mouse_pointer.svg").default;
  /** Иконка компаса  */
  COMPASS = require("Icons/compass.svg").default;
  /** Иконка crosshair */
  CROSSHAIR = require("Icons/crosshair.svg").default;
  /** Иконка флага */
  FLAG = require("Icons/flag.svg").default;
  /** Иконка глобуса */
  GLOBE = require("Icons/globe.svg").default;
  /** Иконка home */
  HOME = require("Icons/home.svg").default;
  /** Иконка пина на карте */
  MAP_PIN = require("Icons/map_pin.svg").default;
  /** Иконка карты */
  MAP = require("Icons/map.svg").default;
  /** Иконка навигации */
  NAVIGATION = require("Icons/navigation.svg").default;
  /** Иконка навигации 2 */
  NAVIGATION_2 = require("Icons/navigation_2.svg").default;
  /** Иконка package */
  PACKAGE = require("Icons/package.svg").default;
  /** Иконка процента */
  PERCENT = require("Icons/percent.svg").default;
  /** Иконка телефонный звонок */
  CALL = require("Icons/call.svg").default;
  /** Иконка переадресация звонка */
  FORWARDED = require("Icons/forwarded.svg").default;
  /** Иконка входящий вызов */
  INCOMING = require("Icons/incoming.svg").default;
  /** Иконка пропущенного звонка */
  MISSED = require("Icons/missed.svg").default;
  /** Иконка отключить звонок */
  OFF = require("Icons/off.svg").default;
  /** Иконка исходящий вызов */
  OUTGOING = require("Icons/outgoing.svg").default;
  /** Иконка телефон */
  PHONE = require("Icons/phone.svg").default;
  /** Иконка pocket */
  POCKET = require("Icons/pocket.svg").default;
  /** Иконка power */
  POWER = require("Icons/power.svg").default;
  /** Иконка принтера */
  PRINTER = require("Icons/printer.svg").default;
  /** Иконка радио */
  RADIO = require("Icons/radio.svg").default;
  /** Иконка rss */
  RSS = require("Icons/rss.svg").default;
  /** Иконка поиска */
  SEARCH = require("Icons/search.svg").default;
  /** Иконка отправки */
  SEND = require("Icons/send.svg").default;
  /** Иконка server */
  SERVER = require("Icons/server.svg").default;
  /** Иконка настройки */
  SETTINGS = require("Icons/settings.svg").default;
  /** Иконка поделиться */
  SHARE = require("Icons/share .svg").default;
  /** Иконка поделиться 2 */
  SHARE_2 = require("Icons/share_2.svg").default;
  /** Иконка shield_off */
  SHIELD_OFF = require("Icons/shield_off.svg").default;
  /** Иконка shield_on */
  SHIELD_ON = require("Icons/shield_on.svg").default;
  /** Иконка shopping_bag */
  SHOPPING_BAG = require("Icons/shopping_bag.svg").default;
  /** Иконка shopping_cart */
  SHOPPING_CART = require("Icons/shopping_cart.svg").default;
  /** Иконка sidebar */
  SIDEBAR = require("Icons/sidebar.svg").default;
  /** Иконка slack */
  SLACK = require("Icons/slack.svg").default;
  /** Иконка ползунки */
  SLIDERS = require("Icons/sliders.svg").default;
  /** Иконка smartphone */
  SMARTPHONE = require("Icons/smartphone.svg").default;
  /** Иконка :( */
  FROWN = require("Icons/frown.svg").default;
  /** Иконка : | */
  MEH = require("Icons/meh.svg").default;
  /** Иконка :) */
  SMILE = require("Icons/smile.svg").default;
  /** Иконка звезды */
  STAR = require("Icons/star.svg").default;
  /** Иконка tablet */
  TABLET = require("Icons/tablet.svg").default;
  /** Иконка тэг */
  TAG = require("Icons/tag.svg").default;
  /** Иконка таргета */
  TARGET = require("Icons/target.svg").default;
  /** Иконка terminal */
  TERMINAL = require("Icons/terminal.svg").default;
  /** Иконка thumb_down */
  THUMB_DOWN = require("Icons/thumb_down.svg").default;
  /** Иконка thumb_down_filled */
  THUMB_DOWN_FILLED = require("Icons/thumb_down_filled.svg").default;
  /** Иконка thumb_up */
  THUMB_UP = require("Icons/thumb_up.svg").default;
  /** Иконка thumb_up_filled */
  THUMB_UP_FILLED = require("Icons/thumb_up_filled.svg").default;
  /** Иконка туггла в левом положении  */
  TOGGLE_LEFT = require("Icons/toggle_left.svg").default;
  /** Иконка туггла в правом паложении */
  TOGGLE_RIGHT = require("Icons/toggle_right.svg").default;
  /** Иконка tool */
  TOOL = require("Icons/tool.svg").default;
  /** Иконка урны 2 */
  DELETE_2 = require("Icons/delete_2.svg").default;
  /** Иконка урны */
  DELETE = require("Icons/delete.svg").default;
  /** Иконка truck */
  TRUCK = require("Icons/truck.svg").default;
  /** Иконка airplay */
  AIRPLAY = require("Icons/airplay.svg").default;
  /** Иконка aperture */
  APERTURE = require("Icons/aperture.svg").default;
  /** Иконка cast */
  CAST = require("Icons/cast.svg").default;
  /** Иконка фильма */
  FILM = require("Icons/film.svg").default;
  /** Иконка монитора */
  MONITOR = require("Icons/monitor.svg").default;
  /** Иконка тв */
  TV = require("Icons/tv.svg").default;
  /** Иконка twitch */
  TWITCH = require("Icons/twitch.svg").default;
  /** Иконка twitter */
  TWITTER = require("Icons/twitter.svg").default;
  /** Иконка открытого замка */
  UNLOCKED = require("Icons/unlocked.svg").default;
  /** Иконка отправки в облако */
  UPLOAD_CLOUD = require("Icons/upload_cloud.svg").default;
  /** Иконка отправить фаил */
  UPLOAD = require("Icons/upload.svg").default;
  /** Иконка user_check */
  USER_CHECK = require("Icons/user_check.svg").default;
  /** Иконка user_minus */
  USER_MINUS = require("Icons/user_minus.svg").default;
  /** Иконка user_minus */
  USER_PLUS = require("Icons/user_plus.svg").default;
  /** Иконка user_x */
  USER_X = require("Icons/user_x.svg").default;
  /** Иконка user */
  USER = require("Icons/user.svg").default;
  /** Иконка users */
  USERS = require("Icons/users.svg").default;
  /** Иконка video_off */
  VIDEO_OFF = require("Icons/video_off.svg").default;
  /** Иконка video_on */
  VIDEO_ON = require("Icons/video_on.svg").default;
  /** Иконка voicemail */
  VOICEMAIL = require("Icons/voicemail.svg").default;
  /** Иконка watch */
  WATCH = require("Icons/watch.svg").default;
  /** Иконка wifi off */
  WIFI_OFF = require("Icons/wifi_off.svg").default;
  /** Иконка wifi on */
  WIFI_ON = require("Icons/wifi_on.svg").default;
  /** Иконка легкого дождя */
  CLOUD_DRIZZLE = require("Icons/cloud_drizzle.svg").default;
  /** Иконка молнии  */
  CLOUD_LIGHTNING = require("Icons/cloud_lightning.svg").default;
  /** Иконка облака off */
  CLOUD_OFF = require("Icons/cloud_off.svg").default;
  /** Иконка дождя */
  CLOUD_RAIN = require("Icons/cloud_rain.svg").default;
  /** Иконка снега */
  CLOUD_SNOW = require("Icons/cloud_snow.svg").default;
  /** Иконка облака  */
  CLOUD = require("Icons/cloud.svg").default;
  /** Иконка луны */
  MOON = require("Icons/moon.svg").default;
  /** Иконка солнца */
  SUN = require("Icons/sun.svg").default;
  /** Иконка восхода солнца */
  SUNRISE = require("Icons/sunrise.svg").default;
  /** Иконка заката солнца */
  SUNSET = require("Icons/sunset.svg").default;
  /** Иконка термометра */
  THERMOMETER = require("Icons/thermometer.svg").default;
  /** Иконка зонта */
  UMBRELLA = require("Icons/umbrella.svg").default;
  /** Иконка ветра */
  WIND = require("Icons/wind.svg").default;
  /** Иконка youtube */
  YOUTUBE = require("Icons/youtube.svg").default;
  /** Иконка zap off */
  ZAP_OFF = require("Icons/zap_off.svg").default;
  /** Иконка zap on */
  ZAP_ON = require("Icons/zap_on.svg").default;
  /** Иконка инфо в круге */
  CIRCLE_INFO = require("Icons/circle_info.svg").default;
  /** Иконка STORAGE в круге */
  STORAGE = require("Icons/storage.svg").default;
  /** Иконка bu в круге */
  BU = require("Icons/bu.svg").default;
  /** Иконка DBMS в круге */
  DBMS = require("Icons/dbms.svg").default;
  /** Иконка isoft в круге */
  ISOFT = require("Icons/isoft.svg").default;
  /** Иконка AS в круге */
  AS = require("Icons/as.svg").default;
  /** Иконка инфо в круге */
  STAFF = require("Icons/staff.svg").default;
  /** Иконка COD в круге */
  COD = require("Icons/cod.svg").default;
  /** Иконка перехода к узлу */
  TRANSITION = require("Icons/transition.svg").default;
  /** Иконка перехода к узлу */
  TRANSITION2 = require("Icons/transition2.svg").default;
}

export const list = new List();
