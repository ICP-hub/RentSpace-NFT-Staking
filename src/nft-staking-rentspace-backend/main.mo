import UserHandler "controllers/userHandler";
import User "models/User";
import Functions "Utils";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Types "Types";
actor {
    stable var stableUserRecords : UserHandler.StableData = {
        users = [];
    };

    var userHandler = UserHandler.UserHandler(stableUserRecords);

    system func preupgrade() {
        stableUserRecords := userHandler.toStableData();
    };

    system func postupgrade() {
        userHandler := UserHandler.UserHandler(stableUserRecords);
    };

    public shared ({ caller }) func createUser(user : User.UserInput) : async Result.Result<Text, UserHandler.InvalidError> {
        await Functions.checkAnonymous(caller);
        let newUser = userHandler.createUser(user, caller);
        switch (newUser) {
            case (#ok(user)) {
                return #ok("User created successfully");
            };
            case (#err(error)) {
                return #err(error);
            };
        };
    };

    public shared ({ caller }) func getUser() : async Types.GetUserResult {
        await Functions.checkAnonymous(caller);
        let user = userHandler.get(caller);
        switch (user) {
            case (?user) {
                return #ok(user);
            };
            case (null) {
                return #err(#notFound);
            };
        };
    };

    public shared ({ caller }) func updateUserProfile(_newUserData : { name : ?Text; email : ?Text }) : async Result.Result<Text, Types.UpdateUserError> {
        await Functions.checkAnonymous(caller);
        let updatedUserProfile = userHandler.updateUserProfile(caller, _newUserData);
        switch (updatedUserProfile) {
            case (#ok(user)) {
                return #ok("User updated successfully");
            };
            case (#err(error)) {
                return #err(error);
            };
        };
    };

};
