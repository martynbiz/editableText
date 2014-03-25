# editableText

jQuery powered plugin for creating dynamic forms.

Imagine a table of data, each row with columns of field. Instead of clicking to another page to edit fields, this plug in allows the user to directly edit each field in the table by clicking (or double-clicking).

Below is a simple example. Here we have a basic form containing a table of column values.

```
<form name="tableForm" action="#" method="post" class="textForm">
<table width="100%" border="1" width="0" cellpadding="5" cellspacing="0">
	<tr>
		<th width="30%">Name</th>
		<th width="30%">Age</th>
		<th width="40%">Country</th>
	</tr>
	<tr data-id="1">
		<td class="textFormGroup">
            <input type="text" name="name" value="Martyn" />
        </td>
		<td class="textFormGroup">
            <select name="country">
                <option value="Scotland">Scotland</option>
                <option value="United Kingdom">United Kingdom</option>
            </select>
        </td>
		<td class="textFormGroup">
            <textarea name="description">Martyn is a Scottish lad with an interest in things such as programming, cycling, camping, hiking and traveling. He has been living in Japan for about 3 and a half years and is looking forward to moving to Tokyo.</textarea>
        </td>
	</tr>
</table>
</form>
```

Notice the data-id attribute set in the tr tag. This let's us kow which row id to update. We'll define the callback for when a field is updated in our options (onSave).

Here we set the form/table to an editableText form/table.

```
$(".textForm").editableText({
    editOn: "click",
    onSave: function(clickable, editable) {
        // triggered when we hide the form element
        var id = $(editable).closest("[data-id]").data("id")
        var data = {};
        data[$(editable).attr("name")] = $(editable).val();
        $.ajax({
            url: '/names/'+id,
            data: data,
            method: "post"
        });
    }
});
```

So when the user has updated the field, the onSave callback will be triggered. In this case, it saves the change. See example <a target="_blank" href="http://jsfiddle.net/bizt/y4p9u/13/">here</a>.

## Options

<table width="100%" border="1" width="0" cellpadding="5" cellspacing="0">
	<tr>
		<th width="30%">editOn</th>
		<td>String|Array. Event to edit texton. "click" by default.</th>
	</tr>
	<tr>
		<th width="30%">onSave</th>
		<td>Function. Callback for when the user is finished with editing</th>
	</tr>
	<tr>
		<th width="30%">truncate</th>
		<td>Integer. For large text items, this will truncate them</th>
	</tr>
</table>
