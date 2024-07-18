import Result "mo:base/Result";
import Error "mo:base/Error";
import User "models/User";
module {
     public type GetUserError = {
        #notFound;
        #notAuthorized;
    };
    
    public type UpdateUserError = {
        #UserNotFound;
        #MissingData;
        #NotAuthorized;
    };

    public type GetUserResult = Result.Result<User.User, Text>;
}