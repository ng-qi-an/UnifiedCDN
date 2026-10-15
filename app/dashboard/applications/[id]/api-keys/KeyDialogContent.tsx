import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export default function KeyDialogContent({name, setName, hasExpiry, setHasExpiry, expiryDate, setExpiryDate}: {name: string, setName: (name: string) => void, hasExpiry: boolean, setHasExpiry: (hasExpiry: boolean) => void, expiryDate: string, setExpiryDate: (expiryDate: string) => void}){
    return <>
        <Field>
            <FieldLabel>Name</FieldLabel>
            <Input required placeholder="My API Key" value={name} onChange={(e) => setName(e.target.value)}/>
        </Field>
        <Field orientation="horizontal">
            <FieldLabel htmlFor="expiresSwitch">Expires</FieldLabel>
            <Switch id="expiresSwitch" checked={hasExpiry} onCheckedChange={setHasExpiry} />
        </Field>
        {hasExpiry && <Field>
            <FieldLabel>Expiry date</FieldLabel>
            <Input required type="datetime-local" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)}/>
            <FieldDescription>The key will stop working after this date.</FieldDescription>
        </Field>}
    </>
}