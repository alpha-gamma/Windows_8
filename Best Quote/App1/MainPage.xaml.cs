using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Windows.Foundation;
using Windows.Foundation.Collections;
using Windows.UI.Notifications;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Controls.Primitives;
using Windows.UI.Xaml.Data;
using Windows.UI.Xaml.Input;
using Windows.UI.Xaml.Media;
using Windows.UI.Xaml.Navigation;
using Windows.ApplicationModel.DataTransfer;
using System.Text;
using Windows.Storage.Streams;
using Windows.Data.Xml.Dom;
using Windows.UI.Popups;
using System.Globalization;
using Windows.System.UserProfile;
using Windows.ApplicationModel.Background;



// The Blank Page item template is documented at http://go.microsoft.com/fwlink/?LinkId=234238

namespace App1
{
    /// <summary>
    /// An empty page that can be used on its own or navigated to within a Frame.
    /// </summary>
    /// 
     

    public sealed partial class MainPage : Page
    {
        public MainPage()
        {
            this.InitializeComponent();
        }

   
     


        /// <summary>
        /// Invoked when this page is about to be displayed in a Frame.
        /// </summary>
        /// <param name="e">Event data that describes how this page was reached.  The Parameter
        /// property is typically used to configure the page.</param>
        protected override void OnNavigatedTo(NavigationEventArgs e)
        {
            quotations qq = new quotations();
            Random ran = new Random();
            int num = ran.Next(50);
            List<TextBlock> q = new List<TextBlock>();
            q.Add(q1); q.Add(q2); q.Add(q3); q.Add(q4); q.Add(q5); q.Add(q6); q.Add(q7); q.Add(q8); q.Add(q9); q.Add(q10);
            q.Add(q11); q.Add(q12); q.Add(q13); q.Add(q14); q.Add(q15); q.Add(q16); q.Add(q17); q.Add(q18); q.Add(q19); q.Add(q20);
            q.Add(q21); q.Add(q22); q.Add(q23); q.Add(q24); q.Add(q25); q.Add(q26); q.Add(q27); q.Add(q28); q.Add(q29); q.Add(q30);
            q.Add(q31); q.Add(q32); q.Add(q33); q.Add(q34); q.Add(q35); q.Add(q36); q.Add(q37); q.Add(q38); q.Add(q39); q.Add(q40);
            q.Add(q41); q.Add(q42); q.Add(q43); q.Add(q44); q.Add(q45); q.Add(q46); q.Add(q47); q.Add(q48); q.Add(q49); q.Add(q50);

            for (int i = 0; i < 50; i++)
            {
                q[i].Text = qq.quote[num++];

                if (num >= 49)
                    num = 0;
            }

            DataTransferManager.GetForCurrentView().DataRequested += OnDataRequested;

            XmlDocument xmltile = TileUpdateManager.GetTemplateContent(TileTemplateType.TileWideText09);

            xmltile.GetElementsByTagName("text")[0].AppendChild(xmltile.CreateTextNode("Best Quote!!"));
            xmltile.GetElementsByTagName("text")[1].AppendChild(xmltile.CreateTextNode(q35.Text));


            TileNotification tileupdate = new TileNotification(xmltile);
            TileUpdateManager.CreateTileUpdaterForApplication().Update(tileupdate);

           

        }

        void OnDataRequested(DataTransferManager sender, DataRequestedEventArgs args)
        {
            var request = args.Request;
            request.Data.Properties.Title = "Quote of the Day!!";
            request.Data.Properties.Description = "Share the Best Quote with your Friends.";
            TextBlock qu = (TextBlock)Items.SelectedItem;
            request.Data.SetText(qu.Text + " \n via Best Quotes");
        }
        

    }
}
