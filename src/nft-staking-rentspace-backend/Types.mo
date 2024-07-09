import Result "mo:base/Result";
import User "models/User";
module {
     public type GetUserError = {
        #notFound;
        #notAuthorized;
    };
    public type GetUserResult = Result.Result<User.User, GetUserError>;
}