using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Windows.ApplicationModel.Background;
using Windows.Data.Xml.Dom;
using Windows.System.UserProfile;
using Windows.UI.Notifications;

namespace TileUpdateRT
{
    public sealed class Class1 : IBackgroundTask
    {
        public void Run(IBackgroundTaskInstance taskInstance)
        {
            var deferral = taskInstance.GetDeferral();
            CreateSchedule();
            deferral.Complete();
        }

        public static void CreateSchedule()
        {
            var tileUpdater = TileUpdateManager.CreateTileUpdaterForApplication();
            var plannedUpdated = tileUpdater.GetScheduledTileNotifications();

            string language = GlobalizationPreferences.Languages.First();
            CultureInfo cultureInfo = new CultureInfo(language);

            DateTime now = DateTime.Now;
            DateTime planTill = now.AddHours(4);

            DateTime updateTime = new DateTime(now.Year, now.Month, now.Day, now.Hour, now.Minute, 0).AddMinutes(1);
            if (plannedUpdated.Count > 0)
                updateTime = plannedUpdated.Select(x => x.DeliveryTime.DateTime).Union(new[] { updateTime }).Max();

            const string xml = @"<tile><visual>
                                        <binding template=""TileSquareText02""><text id=""1"">{0}</text><text id=""2"">{1}</text></binding>
                                        <binding template=""TileWideText01""><text id=""1"">{0}</text><text id=""2"">{1}</text><text id=""3""></text><text id=""4""></text><text id=""5""></text></binding>
                                   </visual></tile>";

            var tileXmlNow = string.Format(xml, now.ToString(cultureInfo.DateTimeFormat.ShortTimePattern), now.ToString(cultureInfo.DateTimeFormat.LongDatePattern));
            XmlDocument documentNow = new XmlDocument();
            documentNow.LoadXml(tileXmlNow);

            tileUpdater.Update(new TileNotification(documentNow) { ExpirationTime = now.AddMinutes(1) });

            for (var startPlanning = updateTime; startPlanning < planTill; startPlanning = startPlanning.AddMinutes(1))
            {
                //Debug.WriteLine(startPlanning);
                //Debug.WriteLine(planTill);

                try
                {
                    var tileXml = string.Format(xml, startPlanning.ToString(cultureInfo.DateTimeFormat.ShortTimePattern), startPlanning.ToString(cultureInfo.DateTimeFormat.LongDatePattern));
                    XmlDocument document = new XmlDocument();
                    document.LoadXml(tileXml);

                    ScheduledTileNotification scheduledNotification = new ScheduledTileNotification(document, new DateTimeOffset(startPlanning)) { ExpirationTime = startPlanning.AddMinutes(1) };
                    tileUpdater.AddToSchedule(scheduledNotification);

                    //Debug.WriteLine("schedule for: " + startPlanning);
                }
                catch (Exception e)
                {
                    //Debug.WriteLine("exception: " + e.Message);
                }
            }
        }
    }
}
