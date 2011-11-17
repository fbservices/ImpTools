// ImpTools.jar should be in SEARCH_HOME/lib/java/common/
import ImpTools;
import org.codehaus.jackson.map.*;

// Put it in the data model so we can access it in Freemarker - ONLY WORKS ON RESPONSE ATM
transaction.response.customData.put("ImpTools", new ImpTools());
