<#---
    Custom tags to be used in the modern UI.
-->

<#--- @begin ImpTools -->

<#---
    Retrieve the value of environment variable name.

    @param name Name of the environment variable to return
-->

<#macro GetVersion>
   ${response.customData.ImpTools.getVersion()}
</#macro>

<#-- @end -->
