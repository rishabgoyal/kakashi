public class FeedItemMentionClass {

    public static void createFeedforChatter()
    {
            
        ConnectApi.FeedItemInput feedItemInput = new ConnectApi.FeedItemInput();
        ConnectApi.MentionSegmentInput mentionSegmentInput = new ConnectApi.MentionSegmentInput();
        ConnectApi.MessageBodyInput messageBodyInput = new ConnectApi.MessageBodyInput();
        ConnectApi.TextSegmentInput textSegmentInput = new ConnectApi.TextSegmentInput();
        
       
        
        
        
        
        messageBodyInput.messageSegments = new List<ConnectApi.MessageSegmentInput>();
        
        mentionSegmentInput.id = '0056F000009wJNtQAM';
        messageBodyInput.messageSegments.add(mentionSegmentInput);
        
        textSegmentInput.text = ' How are you?';
        
        messageBodyInput.messageSegments.add(textSegmentInput);
        
        
        mentionSegmentInput.id = '0056F000009wJNtQAM';
        messageBodyInput.messageSegments.add(mentionSegmentInput);
        
        
        textSegmentInput.text = ' Please Do it Correctly?';
        
        messageBodyInput.messageSegments.add(textSegmentInput);
        
        
        feedItemInput.body = messageBodyInput;
        feedItemInput.feedElementType = ConnectApi.FeedElementType.FeedItem;
       feedItemInput.subjectId = '0066F00000ukh9tQAA';
        
        ConnectApi.FeedElement feedElement = ConnectApi.ChatterFeeds.postFeedElement(Network.getNetworkId(), feedItemInput);
        
    }
}